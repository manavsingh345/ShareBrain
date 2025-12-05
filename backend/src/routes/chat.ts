import express from "express";
import thread from "../models/thread.js";
const router = express.Router();
import generateOpenAiResponse from "../utils/openai.js";
import { authMiddleware } from "../middleware.js";
import 'dotenv/config';
import multer from 'multer';
import {Queue} from "bullmq";
import { GoogleGenerativeAIEmbeddings,ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { QdrantVectorStore } from "@langchain/qdrant";
import cloudinary from "../uploadCloudinary.js";
import fs from "fs"

import cors from 'cors'
import { generateTitleFromMessage } from "../utils/summary.js";
import PDFfile from "../models/PDFfile.js";
const app=express();
app.use(cors())

const queue=new Queue("file-upload-queue",{
  connection: {
      host: 'localhost',  // or process.env.VALKEY_HOST
      port: 6379          // or process.env.VALKEY_PORT
    }
});



//Get all threads
router.get("/thread",authMiddleware,async (req,res)=>{
    try{
        const threads = await thread.find({userId: req.userId }).sort({ updatedAt: -1 });
        res.json(threads);
    }catch(e){
        res.json({
            message: "Failed to fetch threads"
        })
    }
});

//Get particular thread when you click on it it show on the page
router.get("/thread/:threadId",authMiddleware,async (req,res)=>{
    const {threadId}=req.params;
    try{
        const th=await thread.findOne({threadId,userId:req.userId});
        if(!th){
            res.json({
                message:"ThreadId not found"
            })
        }
        res.json(th?.messages);
    }catch(e){
        res.json({
            message:"Error will accessing threadId"
        })
    }
});

router.delete("/thread/:threadId",authMiddleware,async(req,res)=>{
    const {threadId}=req.params;
    try{
        const deletethread=await thread.findOneAndDelete({threadId,userId:req.userId});
        if(!deletethread){
            res.status(404).json({error:"Thread is not found"});
        }
        res.status(200).json({success: "thread is deleted"})
    }catch(e){
        console.log(e);
        res.json({
            e:"Error will deleting the thread"
        })
    }
});






// //pdf
const upload = multer({ dest: "uploads/" }); 
router.post('/upload/pdf', authMiddleware, upload.single('pdf'), async (req, res) => {
  try {
    const userId = req.userId;
    const originalName = req.file?.originalname;

    // 1 Upload to Cloudinary
    const localpath = req.file?.path;
    const cloudUpload = await cloudinary.uploader.upload(localpath!, {
      folder: "pdfs",
      resource_type: "raw"
    });
    if(localpath) fs.unlinkSync(localpath);

    // 2 Check if this PDF was uploaded before by same user
    let pdf = await PDFfile.findOne({ userId, originalName });

    if (pdf) {
      console.log("Same PDF uploaded again → reusing pdfId:", pdf._id);
      // update cloud path
      pdf.path = cloudUpload.secure_url;
      pdf.filename = cloudUpload.public_id;
      pdf.embedded = false; // re-embed required
      await pdf.save();
    } else {
      console.log("New PDF uploaded → creating new pdfId");
      pdf = await PDFfile.create({
        originalName,
        filename: cloudUpload.public_id,
        path: cloudUpload.secure_url,
        embedded: false,
        userId
      });
    }

    // 3 Link PDF to thread
    let { threadId, message } = req.body;
    let th;

    if (threadId) {
      th = await thread.findOne({ threadId, userId });

      if (!th) {
        const shortTitle = await generateTitleFromMessage(message);
        th = new thread({ threadId, title: shortTitle, messages: [], pdfId: [pdf._id], userId });
      } else {
        if (!th.pdfId.includes(pdf._id)) th.pdfId.push(pdf._id);
        th.updatedAt = new Date();
      }
      await th.save();
    } else {
      const newThreadId = Date.now().toString();
      th = new thread({ threadId: newThreadId, title: "New Thread", messages: [], pdfId: [pdf._id], userId });
      await th.save();
    }

    // 4 Send job to worker
    await queue.add("file-ready", {
      pdfId: pdf._id.toString(),
      userId,
      filename: originalName,
      path: cloudUpload.secure_url
    });

    return res.json({
      message: pdf.embedded
        ? "PDF updated and re-embedding started."
        : "PDF uploaded successfully. Embedding started.",
      pdfId: pdf._id
    });

  } catch (err) {
    console.error("Upload failed:", err);
    return res.status(500).json({ error: "Failed to upload PDF" });
  }
});



// // Get all uploaded PDFs (for history)
router.get("/pdf/history", authMiddleware,async (req, res) => {
  try {
    const pdfs = await PDFfile.find({userId:req.userId}).sort({ uploadedAt: -1 });
    res.json(pdfs);
  } catch (error) {
    console.error("Error fetching PDFs:", error);
    res.status(500).json({ message: "Error fetching uploaded PDFs" });
  }
});

router.post("/chat1", authMiddleware,async (req, res) => {
  let { threadId, message } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  if (!threadId) {
    threadId = Date.now().toString();
  }

  try {
    // --- Fetch or create thread ---
    let th = await thread.findOne({ threadId, userId: req.userId});
    if (!th) {
      const shortTitle = await generateTitleFromMessage(message);
      th = new thread({
        userId:req.userId,
        threadId,
        title: shortTitle,
        messages: [{ role: "user", content: message }],
      });
      await th.save();
    } else {
      th.messages.push({ role: "user", content: message });
      await th.save();
    }

    let assistantReply;

    // --- Check if thread has PDFs ---
    if (th.pdfId && th.pdfId.length > 0) {
      console.log("PDFs found → using Gemini with context");

      // 1️ Build embeddings retriever
      const embeddings = new GoogleGenerativeAIEmbeddings({
        model: "text-embedding-004",
        apiKey: process.env.GEMINI_RAG_KEY || "",
      });

      const vectorStore = await QdrantVectorStore.fromExistingCollection(
        embeddings,
        {
          url: "http://localhost:6333",
          collectionName: `user_${req.userId}`,
        }
      );

      // Filter only the PDFs attached to this thread
        const pdfIds = th.pdfId.map(id => id.toString());
      // Filter only chunks belonging to this thread's PDFs
        const filter = {
            should: pdfIds.map(id => ({
            key: "metadata.pdfId",
            match: { value: id }
          }))
        };
      // Retrieve top-k chunks
      const results = await vectorStore.similaritySearch(message, 6, filter);


      // 2️ System prompt
      const contextText = results.map(r => r.pageContent).join("\n\n");
      const SYSTEM_PROMPT = `You are a helpful assistant that answers questions based on the provided PDF context. 
      If the answer exists in the context, answer from context.
      If the context does not contain the answer, rely on your general knowledge.
      Do not say "context not provided". 
      Instead, answer naturally.
      Context: ${contextText}`;

      // 3️ Gemini chat
      const model = new ChatGoogleGenerativeAI({
        model: "gemini-2.5-flash",
        apiKey: process.env.GEMINI_RAG_KEY || "",
      });

      const response = await model.invoke([
        ["system", SYSTEM_PROMPT],
        ["human", message],
      ]);

       if (typeof response.content === "string") {
        assistantReply = response.content;
      } else if (Array.isArray(response.content)) {
        assistantReply = response.content
           .map((block) => ("text" in block ? block.text : ""))
          .join("");
      } else {
        assistantReply = "Sorry, I couldn’t generate a proper response.";
      }
    } else {
      console.log("No PDFs → using standard OpenAI reply");
      assistantReply = await generateOpenAiResponse(message);
    }

    // --- Save and return ---
    th.messages.push({ role: "assistant", content: assistantReply });
    th.updatedAt = new Date();
    await th.save();

    res.json({ reply: assistantReply });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Error while sending message" });
  }
});


export default router;