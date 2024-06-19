// src/WebSocketService.js
import io from 'socket.io-client';

const socket = io('http://localhost:3000'); // Replace with your WebSocket server URL

const connect = () => {
  socket.connect();
};

const disconnect = () => {
  socket.disconnect();
};

const sendMessage = (message) => {
  socket.emit('create_message', message);
};

const subscribeToMessages = (callback) => {
  socket.on('response_message', callback);
};

export { connect, disconnect, sendMessage, subscribeToMessages };
