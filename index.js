import { GoogleGenerativeAI } from "@google/generative-ai";
import readline from "readline";
import dotenv from "dotenv";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });



const userInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

userInterface.prompt();

userInterface.on("line", async (input) => {
    await model.generateContent(input)
        .then((result) => {
            console.log(result.response.text());
            userInterface.prompt();
        })
        .catch((error) => {
            console.error(error);
            userInterface.prompt();
        });

});
