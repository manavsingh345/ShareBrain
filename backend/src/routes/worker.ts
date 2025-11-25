import { Worker } from "bullmq";
import { QdrantVectorStore } from "@langchain/qdrant";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import {PDFLoader} from "@langchain/community/document_loaders/fs/pdf";
import {DocxLoader} from "@langchain/community/document_loaders/fs/docx";
import {PPTXLoader} from "@langchain/community/document_loaders/fs/pptx";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import PDFfile from "../models/PDFfile.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
import axios from "axios";
import fs from "fs";
import os from "os";
import path from "path";

dotenv.config();

mongoose.connect(process.env.MONGO_URL!)
  .then(() => console.log("Worker connected to DB"))
  .catch(err => console.error("Worker DB error:", err));

const worker = new Worker(
  "file-upload-queue",
  async (job) => {
    console.log("Job received:", job.data);
    const data = JSON.parse(job.data);

    const { pdfId, userId, filename } = data;

    // 1 Download Cloudinary file to temp
    const tmpFile = path.join(os.tmpdir(), `file-${Date.now()}`);
    const response = await axios.get(data.path, { responseType: "arraybuffer" });
    fs.writeFileSync(tmpFile, response.data);

    // 2 Detect correct loader based on filename
    let loader;
    const lower = filename.toLowerCase();

    if (lower.endsWith(".pdf")) loader = new PDFLoader(tmpFile);
    else if (lower.endsWith(".docx")) loader = new DocxLoader(tmpFile);
    else if (lower.endsWith(".pptx")) loader = new PPTXLoader(tmpFile);
    else {
      console.error("Unsupported file type:", filename);
      return;
    }

    const docs = await loader.load();
    fs.unlinkSync(tmpFile);

    // Split
    const splitter = new RecursiveCharacterTextSplitter({
      chunkSize: 300,
      chunkOverlap: 50,
    });

    let splitDocs = await splitter.splitDocuments(docs);

    // Inject metadata
    splitDocs = splitDocs.map(d => ({
      ...d,
      metadata: {
        pdfId: pdfId.toString(),
        userId: userId.toString()
      }
    }));

    // Embeddings
    const embeddings = new GoogleGenerativeAIEmbeddings({
      model: "text-embedding-004",
      apiKey: process.env.GEMINI_API_KEY || "",
    });

    const collectionName = `user_${userId}`;

    const vectorStore = await QdrantVectorStore.fromExistingCollection(
      embeddings,
      {
        url: "http://localhost:6333",
        collectionName,
      }
    );

    // Delete OLD vectors of this PDF only
    await vectorStore.client.delete(collectionName, {
      filter: {
        must: [
          {
            key: "pdfId",
            match: { value: pdfId.toString() }
          }
        ]
      }
    });

    console.log("Old vectors removed for pdf:", pdfId);

    // Add new vectors
    await vectorStore.addDocuments(splitDocs);

    // Update DB using pdfId (correct way)
    await PDFfile.findByIdAndUpdate(pdfId, { embedded: true });

    console.log("PDF chunks stored in Qdrant for:", pdfId);
  },
  {
    concurrency: 100,
    connection: {
      host: "localhost",
      port: 6379,
    },
  }
);

export default worker;
