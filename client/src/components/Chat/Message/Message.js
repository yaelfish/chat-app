import React from 'react';
import './Message.css';

const Message = ({ message: { text, user, time } }) => {
  
  return (
    <div className="message-container">
      <p 
        style={{color:user.color}} 
        className={user.name === "admin" ? "sent-text admin" : "sent-text"}>
          {time} - {user.name} - {text}
      </p>
    </div>
  );
}
export default Message;