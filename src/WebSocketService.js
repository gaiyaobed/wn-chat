
import io from 'socket.io-client';

let socket;

const connect = (userId) => {
  // Initialize the socket with the userId as a query parameter
  socket = io('http://localhost:3000', {
    query: {
      userId: userId
    }
  });
};

const disconnect = () => {
  if (socket) {
    socket.disconnect();
  }
};

const sendMessage = (message) => {
  if (socket) {
    socket.emit('create_message', message);
  }
};

const subscribeToMessages = (callback) => {
  if (socket) {
    socket.on('response_message', callback);
  }
};

export { connect, disconnect, sendMessage, subscribeToMessages };
