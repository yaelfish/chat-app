import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';
import Messages from './Messages/Messages';
import ChatHeader from './ChatHeader/ChatHeader';
import Input from './Input/Input';
import './Chat.css';

let socket;
const BASE_URL = (process.env.NODE_ENV !== 'development') ? '/' : '//localhost:5000/';

const Chat = ({ location }) => {
  
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket = io(BASE_URL);
    const { name } = queryString.parse(location.search);
    socket.emit('join', name, error => {
      if (error) {
        alert('Joining chat failed, please reconnect');
      }
    });
    return () => {
      socket.emit('disconnect');
    }
  }, [location.search]);

  useEffect(() => {
    socket.on('message', message => {
      setMessages(messages => [...messages, message]);
    });
  }, []);

  const sendMessage = message => {
    if (message) {
      socket.emit('sendMessage', message);
    } else return;
  }

  return (
    <main className="container">
      <div className="chat-container">
        <ChatHeader />
        <Messages messages={messages} />
        <Input sendMessage={sendMessage} />
      </div>
    </main>
  );
}
export default Chat;
