import React, {StrictMode, useState, useEffect} from 'react';
import {createRoot} from 'react-dom/client';
import './styles.css';
import MessageList from './components/MessageList.jsx';
import MessageInput from './components/MessageInput.jsx';

const STORAGE_KEY = 'chat_lab5_messages';

function App() {
  const [username, setUsername] = useState(() => {
    return sessionStorage.getItem('chat_username') || 'Пользователь';
  });

  useEffect(() => {
    sessionStorage.setItem('chat_username', username);
  }, [username]);

  const [messages, setMessages] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch (err) {
      console.error('Ошибка чтения из localStorage:', err);
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    } catch (err) {
      console.error('Ошибка записи в localStorage:', err);
    }
  }, [messages]);

  useEffect(() => {
    localStorage.setItem('chat_username', username);
  }, [username]);

  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key === STORAGE_KEY) {
        try {
          const updatedMessages = event.newValue
            ? JSON.parse(event.newValue)
            : [];
          setMessages(updatedMessages);
        } catch (err) {
          console.error('Ошибка обновления из другой вкладки:', err);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const handleSendMessage = (text) => {
    const newMessage = {
      id: Date.now(),
      author: username || 'Аноним',
      text,
      time: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
    };
    setMessages((prev) => [...prev, newMessage]);
  };

  const handleClearChat = () => {
    setMessages([]);
    localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <div className="chat-window">
      <header className="chat-header">
        <div className="user-profile">
          <label htmlFor="user-name">Ваш никнейм:</label>
          <input
            id="user-name"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <button className="clear-btn" onClick={handleClearChat}>
          Очистить чат
        </button>
      </header>

      <main className="chat-content">
        <MessageList messages={messages} />
      </main>

      <footer className="chat-footer">
        <MessageInput onSendMessage={handleSendMessage} />
      </footer>
    </div>
  );
}

const rootElement = document.querySelector('[data-testid="app"]');

if (!rootElement) {
  throw new Error('Корневой элемент приложения не найден.');
}

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
