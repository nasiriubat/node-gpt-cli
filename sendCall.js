import twilio from "twilio";
import dotenv from "dotenv";

dotenv.config();

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

async function sendCall(text) {
    try {
        const call = await client.calls.create({
            body: text,
            from: process.env.TWILIO_PHONE,
            to: process.env.USER_PHONE,
            url: "http://demo.twilio.com/docs/voice.xml",
        });
        console.log('Message sent: ', call.sid);
        return call.sid;
    } catch (error) {
        console.error('Error sending call: ', error);
        throw error;
    }
}

export default sendCall;
