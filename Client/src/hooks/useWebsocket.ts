import { useEffect, useRef, useState } from 'react';

interface MyWSMessage {
  id: number,
  content: string
}

export interface WebSocketMessage<T = MyWSMessage> {
  type: string;
  data: T;
}

export type Listener<T = undefined> = (message: WebSocketMessage, props?: T) => void;

export const useWebSocket = (url: string) => {
  const socket = useRef<WebSocket | null>(null);
  const [messages, setMessages] = useState<WebSocketMessage[]>([]);
  const [isConnected, setIsConnected] = useState(false);

  const listeners = useRef<((message: WebSocketMessage) => void)[]>([]);

  useEffect(() => {
    socket.current = new WebSocket(url);

    socket.current.onopen = () => {
      setIsConnected(true);
    };

    socket.current.onmessage = (event) => {
      const message: WebSocketMessage = JSON.parse(event.data);
      setMessages((prevMessages) => [...prevMessages, message]);
      listeners.current.forEach((listener) => listener(message));
    };

    socket.current.onclose = () => {
      setIsConnected(false);
    };

    return () => {
      socket.current?.close();
    };
  }, [url]);

  const addListener = (listener: Listener) => {
    listeners.current.push(listener);
  };

  const removeListener = (listener: Listener) => {

    listeners.current = listeners.current.filter((l) => l !== listener);
  };

  const sendMessage = (type: string, data: unknown) => {
    if (socket.current && socket.current.readyState === WebSocket.OPEN) {
      socket.current.send(JSON.stringify({ type, data }));
    }
  };

  return {
    messages,
    isConnected,
    sendMessage,
    addListener,
    removeListener,
  };
};
