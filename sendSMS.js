import twilio from "twilio";
import dotenv from "dotenv";

dotenv.config();

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

export default sendSMS;
