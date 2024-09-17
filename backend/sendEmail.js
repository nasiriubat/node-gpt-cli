import nodemailer from 'nodemailer';

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
        console.log('Email sent: ' + info.response);
    } catch (error) {
        console.error('Error sending email:', error);
        throw error;
    }
}

export default sendEmail;
