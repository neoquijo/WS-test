import React, { createContext, ReactNode, useEffect, useMemo } from 'react';
import { WebSocketService } from '../api/websocketService';

const WebSocketContext = createContext<WebSocketService | null>(null);

export const WebSocketProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const socketService = useMemo(() => new WebSocketService(), []);  // Wrap in useMemo

  useEffect(() => {
    socketService.connect('ws://localhost:4000');
    return () => {
      socketService.disconnect();
    };
  }, [socketService]);

  return (
    <WebSocketContext.Provider value={socketService}>
      {children}
    </WebSocketContext.Provider>
  );
};
