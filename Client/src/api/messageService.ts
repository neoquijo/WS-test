export interface Message {
  id: number;
  content: string;
}

export const fetchMessages = async () => {
  const response = await fetch('http://localhost:4000/messages');
  if (!response.ok) {
    throw new Error('Failed to fetch messages');
  }
  return response.json();
};

export const sendMessage = async (content: string): Promise<void> => {
  await fetch('http://localhost:4000/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ content }),
  });
};
