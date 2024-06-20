import React, { useEffect, useState } from "react";

import {
  connect,
  disconnect,
  sendMessage,
  subscribeToMessages,
} from "./WebSocketService";

function App() {
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");
  const [user, setUser] = useState("");

  useEffect(() => {
    connect(user); // Connect to WebSocket server when component mounts

    // Subscribe to incoming messages
    subscribeToMessages((message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      disconnect(); // Disconnect from WebSocket server when component unmounts
    };
  }, [user]);

  const handleSendMessage = () => {
    if (!user) {
      alert("Please select a user");
    }
    const message = {
      sender_id: user, // Replace with actual sender ID or logic
      // chat_id: "6673dc4b5cd0e937f72b8f41", // Replace with actual receiver ID or logic
      message: messageInput,
      reciever_id: "667417df15dbc03178b12c77",
    };

    sendMessage(message);
    setMessageInput("");
  };

  useEffect(() => {
    fetchMessage();
  }, []);

  const fetchMessage = async () => {
    const response = await fetch(
      "http://localhost:3000/messages?chatId=667418287dde3dc4fc81c044"
    );
    const data = await response.json();
    setMessages(data);
  };

  return (
    <div className="App">
      <h1>WebSocket Chat</h1>
      <select name="users" id="users" onChange={(e) => setUser(e.target.value)}>
        <option value="">Select User</option>
        {/* since it's hardcoded, only user1 will be sender
        and user2 will be receiver */}
        <option value="6673daf115dbc03178b12c66">User1</option>
        <option value="667417df15dbc03178b12c77">User2</option>
      </select>
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
          {messages?.map((msg, index) => (
            <li key={index}>{`${msg.sender_id}: ${msg.message}`}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;