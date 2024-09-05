import React, { useState } from 'react';
import { useMessages } from '../hooks/useMessages';

const MessageInput: React.FC = () => {
  const [input, setInput] = useState('');
  const { postMessage } = useMessages();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      postMessage.mutate(input);
      setInput('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button type="submit">Send</button>
    </form>
  );
};

export default MessageInput;
