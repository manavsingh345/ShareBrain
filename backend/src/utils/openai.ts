import dotenv from 'dotenv';
dotenv.config();

import { GoogleGenerativeAI } from "@google/generative-ai";

const ai = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

const generateOpenAiResponse = async (message: string) => {
  try {
    const model = ai.getGenerativeModel({ model: "gemini-2.5-flash-lite" });

    const result = await model.generateContent(message);
    return result.response.text();
  } catch (e) {
    console.error(e);
  }
};

export default generateOpenAiResponse;