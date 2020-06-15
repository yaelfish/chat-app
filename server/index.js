const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const cors = require('cors');
const router = require('./router');
const { addUser, removeUser, getUser } = require('./users');
const { getCurrentTime } = require('./utils');

const app = express();
const server = http.createServer(app);
const io = socketio(server);
const historyMessages = [];

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.resolve(__dirname, 'public')));
} else {
  const corsOptions = {
    origin: ['http://127.0.0.1:5000', 'http://localhost:5000', 'http://127.0.0.1:3000', 'http://localhost:3000'],
    credentials: true
  };
  app.use(cors(corsOptions));
}

app.use(router);

io.on('connect', (socket) => {
  
  const room = 'main';

  socket.on('join', (name, callback) => {
    try {
      addUser({ id: socket.id, name });
      socket.join(room);
      const now = getCurrentTime();
      socket.emit('message', { time: now, user: {name:'admin'}, text: `Hi ${name}, welcome to the chat.` });
      socket.broadcast.to(room).emit('message', { time: now, user: { name: 'admin' }, text: `${name} has joined!` });
      callback();
    } catch (error) {
      return callback(error);
    }
  });

  socket.on('sendMessage', message => {
    try {
      const user = getUser(socket.id);
      const now = getCurrentTime();
      if (user) {
        const msgToSend = { user, text: message, time: now };
        historyMessages.push(msgToSend);
        io.to(room).emit('message', msgToSend);
      }
    } catch (error) {
      console.error('An error occcured while sending a message: ',error);
    }
    console.log(historyMessages);
  });

  socket.on('disconnect', () => {
    const user = removeUser(socket.id);
    const now = getCurrentTime();
    if (user) {
      io.to(room).emit('message', { time: now, user: { name: 'admin' }, text: `${user.name} has left.` });
    }
  })
});

server.listen(process.env.PORT || 5000, () => console.log(`Server has started.`));