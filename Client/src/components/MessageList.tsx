import React from 'react';
import { useMessages } from '../hooks/useMessages';

const MessageList: React.FC = () => {
  const { messages, isLoading } = useMessages();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {messages?.map((message: { id: number, content: string }) => (
        <div key={message.id}>{message.content}</div>
      ))}
    </div>
  );
};

export default MessageList;
