import React, { useEffect, useState } from 'react';
import { connect, disconnect, sendMessage, subscribeToMessages } from './WebSocketService';

function App() {
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState('');

  useEffect(() => {
    connect(); // Connect to WebSocket server when component mounts

    // Subscribe to incoming messages
    subscribeToMessages((message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      disconnect(); // Disconnect from WebSocket server when component unmounts
    };
  }, []);

  const handleSendMessage = () => {
    const message = {
      sender_id: '666c8a3a8efe6fb5ceeaf3ad', // Replace with actual sender ID or logic
      chat_id: '666c8a9bb3b2a5635e78836a', // Replace with actual receiver ID or logic
      message: messageInput,
    };

    sendMessage(message);
    setMessageInput('');
  };

  return (
    <div className="App">
      <h1>WebSocket Chat</h1>
      <div>
        <input
          type="text"
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
          placeholder="Enter your message..."
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
      <div>
        <h2>Messages</h2>
        <ul>
          {messages.map((msg, index) => (
            <li key={index}>{`${msg.sender_id}: ${msg.message}`}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
