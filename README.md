# GPT Email and SMS Sender ( Fullstack react-node )

This project is a versatile utility built as an assignment for my university teacher at Tampere University. It integrates GPT-based text generation with functionalities for sending SMS messages via Twilio and emails via SMTP.

## Features

- **Gemini AI Model**: Utilizes the free Gemini GPT model `gemini-1.5-flash` for text generation.
- **Twilio API Integration**: Sends SMS messages using the Twilio API.
- **SMTP Email Sending**: Sends emails using SMTP with Gmail or any other email service provider.
- **Encapsulated Functionality**: Provides functions to send SMS and emails by simply passing the text.
- **Environment Variable Management**: Configurable setup using environment variables for secure credential management.
- **Modern JavaScript**: Written using ES6 module syntax for clean and maintainable code.

## Prerequisites

Before you begin, ensure you have the following:

- **Node.js**: Download and install from [Node.js Official Website](https://nodejs.org/).
- **Gemini API KEY**: Download from [Gemini Official Website](https://aistudio.google.com/app/apikey).
- **Twilio Account**: Sign up for a Twilio account [here](https://www.twilio.com/try-twilio) and obtain your `Account SID` and `Auth Token`.
- **Email Account**: Set up an email account for sending emails via SMTP. For Gmail, you will need to enable "less secure app access" or use an app password.


## Installation
- **Clone the repo**
- **npm install**

## API Endpoint

### POST `/send`

This endpoint generates content based on the input and sends an email or SMS based on the specified action.

#### Request Body

- **Content-Type**: `application/json`
- **Body**:
  ```json
  {
    "input": "Your text input here",
    "action": "email" | "sms" | "email_and_sms"
  }


### Response

- **Success**:
  ```json
  {
    "message": "Email sent successfully" | "SMS sent successfully" | "Email and SMS sent successfully"
  }

- **Error**:
```json
{
  "error": "Error message"
}



