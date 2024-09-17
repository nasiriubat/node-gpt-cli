import React, { useState } from 'react';
import axios from 'axios';
import './ChatApp.css';

const ChatApp = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const newMessage = { text: input, type: 'user' };
        setMessages([...messages, newMessage]);
        const response = await axios.post('http://localhost:3000/send', {
            input: input
        });

        try {

            const botMessage = { text: response.data.message, type: 'bot' };
            setMessages([...messages, newMessage, botMessage]);
        } catch (error) {
            console.error('Error sending message:', error);
            const errorMessage = { text: error.message, type: 'bot' };
            setMessages([...messages, newMessage, errorMessage]);
        }

        setInput('');
    };

    return (
        <div className="chat-container">
            <div className="chat-history">
                {messages.map((msg, index) => (
                    <div key={index} className={`message ${msg.type}`}>
                        {msg.text}
                    </div>
                ))}
            </div>
            <form className="chat-form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type your message..."
                />
                <button type="submit">Go</button>
            </form>
        </div>
    );
};

export default ChatApp;
