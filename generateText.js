import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

async function generateText(input) {
    try {
        const result = await model.generateContent(input);
        return result.response.text();
    } catch (error) {
        console.error('Error generating content:', error);
        return null;
    }
}

export default generateText;
