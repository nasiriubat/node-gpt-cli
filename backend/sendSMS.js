import twilio from 'twilio';

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

async function sendSMS(text) {
    try {
        const message = await client.messages.create({
            body: text,
            from: process.env.TWILIO_PHONE,
            to: process.env.USER_PHONE
        });
        console.log('Message sent: ', message.sid);
    } catch (error) {
        console.error('Error sending SMS: ', error);
        throw error;
    }
}

export default sendSMS;
