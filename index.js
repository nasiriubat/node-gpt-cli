import { GoogleGenerativeAI } from "@google/generative-ai";
import readline from "readline";
import dotenv from "dotenv";
import nodemailer from "nodemailer";
import twilio from "twilio";

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

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

async function sendSMS(text) {
    try {
        const message = await client.messages.create({
            body: text,
            from: process.env.TWILIO_PHONE,
            to: process.env.USER_PHONE
        });
        console.log('Message sent: ', message.sid);
        return message.sid;
    } catch (error) {
        console.error('Error sending message: ', error);
        throw error;
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

const emailTriggers = ['send email', 'send pekka an email', 'send an email', 'send an email to pekka', 'send an email', 'email'];
const smsTriggers = ['send sms', 'send pekka a sms', 'send a sms', 'send a sms to pekka', 'send a sms', 'sms'];

userInterface.on("line", async (input) => {
    const shouldSendEmail = emailTriggers.some(trigger => input.toLowerCase().includes(trigger));
    const shouldSendSMS = smsTriggers.some(trigger => input.toLowerCase().includes(trigger));
    const generatedContent = await generateText(input);
    if (generatedContent) {
        if (shouldSendEmail && shouldSendSMS) {

            console.log("Preparing to send email and sms...");
            await sendEmail("Generated Content Email", generatedContent);
            await sendSMS(generatedContent);

        } else if (shouldSendSMS) {

            console.log("Preparing to send SMS...");
            await sendSMS(generatedContent);

        } else if (shouldSendEmail) {

            console.log("Preparing to send email...");
            await sendEmail("Generated Content Email", generatedContent);

        } else {

            const generatedContent = await generateText(input);
            console.log(generatedContent);

        }
    } else {

        console.log("Sorry, I couldn't generate content for that input.");

    }

    userInterface.prompt();
});
