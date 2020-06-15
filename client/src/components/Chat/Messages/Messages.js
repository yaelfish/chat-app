import React from 'react';
import Message from '../Message/Message';
import './Messages.css';

const Messages = ({ messages }) => (
  <main className="messages">
    {messages.map((message, i) => <Message key={i} message={message}/>)}
  </main>
);

export default Messages;