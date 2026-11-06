import React from 'react';

function ChatMessage({author, text, time}) {
  return (
    <div className="message-item">
      <div className="message-header">
        <span className="message-author">{author}</span>
        <span className="message-time">{time}</span>
      </div>
      <div className="message-body">{text}</div>
    </div>
  );
}

export default function MessageList({messages}) {
  if (messages.length === 0) {
    return (
      <div className="messages-empty">
        <p>Сообщений пока нет. Будьте первым!</p>
      </div>
    );
  }

  return (
    <div className="messages-container">
      {messages.map((msg) => (
        <ChatMessage
          key={msg.id}
          author={msg.author}
          text={msg.text}
          time={msg.time}
        />
      ))}
    </div>
  );
}
