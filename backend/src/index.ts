import express, { Request, Response } from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import {z} from "zod";
const cors = require('cors');
import {ContentModel, UserModel,LinkModel} from "./models/db";
import {JWT_PASSWORD} from "./config";
import {authMiddleware} from "./middleware";
import { random } from "./utils";
import generateOpenAiResponse from "./utils/openai";
const app=express();
app.use(express.json());
import path from "path";
import dotenv from "dotenv";

dotenv.config({ path: path.resolve(__dirname, "../.env") });


mongoose.connect("mongodb+srv://admin:2oHbAW7FWPiQS7zZ@cluster0.ow5iono.mongodb.net/secondbrain?retryWrites=true&w=majority&appName=Cluster0").then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.error(" MongoDB connection error:", err);
  });

app.use(cors({
  origin: 'http://localhost:5173',  // Allow Vite frontend
  credentials: true  // Optional: if you send cookies or headers
}));

app.post("/api/v1/signup", async (req: Request, res: Response) => {
    //left zod validation,hashing
  try{
      const signupSchema = z.object({
      username:z.string().min(3).max(20),
      email: z.string().email(),
      password:z.string().min(4).max(100)
    })
    const validation = signupSchema.safeParse(req.body);
    if(!validation.success){
      return res.status(400).json({
        message:"Invalid input",
        errors:validation.error
      });
    }
    const {username,email,password}=validation.data;
    let errorThrown=false;
    const hashedPassword=await bcrypt.hash(password,5);
    
    const newUser=await UserModel.create({
        username:username,
        email:email,
        password:hashedPassword,
    });
    res.json({
      message: "User is signed up",
      username: newUser.username,
      email: newUser.email
    });
  }catch(e){
    res.status(411).json({
      message:"User already exists"
    })
  }
});

app.post("/api/v1/signin",async (req, res) => {
    try {
    const email=req.body.email;
    const password=req.body.password;
    const existingUser=await UserModel.findOne({
      email
    });
    if(!existingUser){
      res.status(403).json({
        message:"User does not exits in out db"
      })
      return
    }
    if (!existingUser.password) {
         return res.status(500).json({ message: "Password is missing for this user in DB" });
      }
     
    const passwordMatch=await bcrypt.compare(password,existingUser.password);
    if(passwordMatch){
      const token=jwt.sign({
        id:existingUser._id.toString()
      },JWT_PASSWORD);

      res.json({
      token: token,
      username: existingUser.username,
      email: existingUser.email
      });

    }else{
      res.status(403).json({
        message:"Invalid"
      })
    } } catch (e) {
    console.error("Signin failed:", e);
    return res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/api/v1/content",authMiddleware, async (req, res) => {
   try {
    const link=req.body.link;
    const type=req.body.type;
    await ContentModel.create({
      link,
      type,
      title:req.body.title,
      //@ts-ignore
      userId:req.userId,
      tags:[]
    })
    return res.json({
        message:"Content added"
    })
    } catch (err) {
    console.error("Add content failed:", err);
    res.status(500).json({ message: "Failed to add content" });
  }
});

app.get("/api/v1/content",authMiddleware, async (req, res) => {
    //@ts-ignore  
    const userId=req.userId;
    const content=await ContentModel.find({
        userId:userId
    }).populate("userId","username")              //to get the whole or what you need info of the user populate used
    res.json({
      content
    })

});


interface AuthRequest extends Request {
  userId?: string;
}



app.delete("/api/v1/content/:contentId", authMiddleware, async (req: AuthRequest, res) => {
  const { contentId } = req.params;
  const userId = req.userId;
  if (!contentId || !userId) {
    return res.status(400).json({ message: "Missing contentId or userId" });
  }

  try {
    const content = await ContentModel.findById(contentId);

    if (!content) {
      console.log(" Content not found");
      return res.status(404).json({ message: "Content not found" });
    }

    // String compare ensures match even if one side is ObjectId
    if (String(content.userId) !== String(userId)) {
      console.log(" Unauthorized delete attempt");
      return res.status(403).json({ message: "Unauthorized" });
    }

    await content.deleteOne(); // no filter mismatch now
    return res.json({ message: "Deleted successfully" });
  } catch (err) {
    console.error(" Delete failed:", err);
    return res.status(500).json({ message: "Failed to delete content" });
  }
});


app.post("/api/v1/brain/share",authMiddleware, async (req, res) => {
    try {
    const share =req.body.share;
    if(share==true){
     const existingLink=await LinkModel.findOne({
      //@ts-ignore
      userId:req.userId
     }
     )
     if(existingLink){
        res.json({
        hash:existingLink.hash
      })
     }
      const hash=random(10);
      await LinkModel.create({
        //@ts-ignore
        userId:req.userId,
        hash:hash
      })
       res.json({
        message:"/share/"+ hash
    })
  
    
  }else{
       await  LinkModel.deleteOne({
          //@ts-ignore
          userId:req.userId
        });
         res.json({
        message:"Removed links"
      })
    }
    } catch (err) {
    console.error("Share brain failed:", err);
    res.status(500).json({ message: "Something went wrong while sharing brain" });
  }
   
});


app.get("/api/v1/brain/:shareLink", async (req, res) => {
   try {
  const hash=req.params.shareLink;
  const link = await LinkModel.findOne({
      hash
  });
  if(!link) {
    res.status(411).json({
      message:"Sorry incorrect input"
    });
    return;
  }
  const content=await ContentModel.findOne({
      userId:link.userId
  });
  const user=await UserModel.findOne({
    _id:link.userId
  });

   if(!user) {
    res.status(411).json({
      message:"User not found"
    });
    return;
  }

  res.json({
    username:user.username,
    content:content
  })
   } catch (err) {
    console.error("Share link fetch failed:", err);
    res.status(500).json({ message: "Failed to fetch shared brain" });
  }
}); 

app.post("/api/v1/chat", async(req,res)=>{
    const {message} =req.body;
    
    try{
      const assiantReply= await generateOpenAiResponse(message);
      console.log(assiantReply);
      res.json({reply:assiantReply});
    }catch(e){
      res.status(500).json({message:"Error will sending message"});
    }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});