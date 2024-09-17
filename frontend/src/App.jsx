import React from 'react';
import ChatApp from './components/ChatApp';
import './App.css';

const App = () => {
    return (
        <div className="app">
            <h1>Node React Express Gpt</h1>
            <small>If you use word ( email or sms ) in your text it will send email or sms to the preset email and phone number</small>
            <ChatApp />
        </div>
    );
};

export default App;
