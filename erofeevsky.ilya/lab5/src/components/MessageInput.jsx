import React, {useState} from 'react';

export default function MessageInput({onSendMessage}) {
  const [text, setText] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) {return;}

    onSendMessage(trimmed);
    setText('');
  };

  return (
    <form className="message-input-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Введите сообщение..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        autoComplete="off"
      />
      <button type="submit" disabled={!text.trim()}>
        Отправить
      </button>
    </form>
  );
}
