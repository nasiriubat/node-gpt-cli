import { GoogleGenerativeAI } from "@google/generative-ai";
import readline from "readline";
import dotenv from "dotenv";
import nodemailer from "nodemailer";

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


const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASSWORD,
    },
});

async function sendEmail(subject, text) {
    const mailOptions = {
        from: process.env.GMAIL_USER,
        to: process.env.USER_EMAIL,
        subject: subject,
        text: text,
    };

    try {
        let info = await transporter.sendMail(mailOptions);
        console.log('Email sent: ' + process.env.USER_EMAIL);
    } catch (error) {
        console.error('Error sending email:', error);
    }
}

const userInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

userInterface.prompt();

const emailTriggers = ['send email', 'send pekka an email', 'send an email', 'send an email to pekka', 'send an email'];
const smsTriggers = ['send sms', 'send pekka a sms', 'send a sms', 'send a sms to pekka', 'send a sms'];

userInterface.on("line", async (input) => {
    const shouldSendEmail = emailTriggers.some(trigger => input.toLowerCase().includes(trigger));

    if (shouldSendEmail) {
        console.log("Preparing to send email...");
        const generatedContent = await generateText(input);

        if (generatedContent) {
            await sendEmail("Generated Content Email", generatedContent);
        }

    } else {
        const generatedContent = await generateText(input);
        if (generatedContent) {
            console.log(generatedContent);
        }
    }

    userInterface.prompt();
});
