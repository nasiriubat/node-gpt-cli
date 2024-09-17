import express from 'express';
import bodyParser from 'body-parser';
import generateText from './generateText.js';
import sendEmail from './sendEmail.js';
import sendSMS from './sendSMS.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const emailTriggers = ['send email', 'send pekka an email', 'send an email', 'send an email to pekka', 'send an email'];
const smsTriggers = ['send sms', 'send pekka a sms', 'send a sms', 'send a sms to pekka', 'send a sms', 'sms'];

// Endpoint to handle text generation and sending email or SMS
app.post('/send', async (req, res) => {
    const { input } = req.body;
    if (!input) {
        return res.status(400).json({ error: 'Input is required' });
    }

    try {
        const generatedContent = await generateText(input);
        if (!generatedContent) {
            return res.status(500).json({ error: "Failed to generate content" });
        }

        const lowerCaseInput = input.toLowerCase();
        const shouldSendEmail = emailTriggers.some(trigger => lowerCaseInput.includes(trigger));
        const shouldSendSMS = smsTriggers.some(trigger => lowerCaseInput.includes(trigger));

        if (shouldSendEmail && shouldSendSMS) {
            await sendEmail("Generated Content Email", generatedContent);
            await sendSMS(generatedContent);
            return res.json({ message: 'Email and SMS sent successfully' });
        } else if (shouldSendSMS) {
            await sendSMS(generatedContent);
            return res.json({ message: 'SMS sent successfully' });
        } else if (shouldSendEmail) {
            await sendEmail("Generated Content Email", generatedContent);
            return res.json({ message: 'Email sent successfully' });
        } else {
            return res.json({ message: generatedContent });
        }
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ error: 'An error occurred' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on  http://localhost:${port}`);
});
