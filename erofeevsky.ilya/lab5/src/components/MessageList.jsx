import React from 'react';

function ChatMessage({author, text, time}) {
  return (
    <div className="message-item" data-testid="chat-message">
      <div className="message-header">
        <span className="message-author" data-testid="chat-author">
          {author}
        </span>
        <span className="message-time" data-testid="chat-time">
          {time}
        </span>
      </div>
      <div className="message-body" data-testid="chat-text">
        {text}
      </div>
    </div>
  );
}

export default function MessageList({messages}) {
  return (
    <div className="messages-container" data-testid="chat-messages">
      {messages.length === 0 ? (
        <div className="messages-empty">
          <p>Сообщений пока нет. Будьте первым!</p>
        </div>
      ) : (
        messages.map((msg) => (
          <ChatMessage
            key={msg.id}
            author={msg.author}
            text={msg.text}
            time={msg.time}
          />
        ))
      )}
    </div>
  );
}
