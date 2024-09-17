import readline from "readline";
import generateText from "./generateText.js";
import sendEmail from "./sendEmail.js";
import sendSMS from "./sendSMS.js";

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
            console.log("Preparing to send email and SMS...");
            await sendEmail("Generated Content Email", generatedContent);
            await sendSMS(generatedContent);
        } else if (shouldSendSMS) {
            console.log("Preparing to send SMS...");
            await sendSMS(generatedContent);
        } else if (shouldSendEmail) {
            console.log("Preparing to send email...");
            await sendEmail("Generated Content Email", generatedContent);
        } else {
            console.log(generatedContent);
        }
    } else {
        console.log("Sorry, I couldn't generate content for that input.");
    }

    userInterface.prompt();
});
