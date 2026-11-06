import React from 'react';

function ChatMessage({author, text, time}) {
  return (
    <div className="message-item" data-testid="chat-message">
      <div className="message-header">
        <span className="message-author" data-testid="chat-message-author">
          {author}
        </span>
        <span className="message-time" data-testid="chat-message-time">
          {time}
        </span>
      </div>
      <div className="message-body" data-testid="chat-message-text">
        {text}
      </div>
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
    <div className="messages-container" data-testid="chat-messages">
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
