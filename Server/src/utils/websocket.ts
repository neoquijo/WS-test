import { Server } from 'ws';
import { createServer } from 'http';
import { MessageRepository } from '../repositories/MessageRepository';

export const setupWebSocketServer = (server: ReturnType<typeof createServer>, repository: MessageRepository) => {
  const wss = new Server({ server });
  repository.message$.subscribe(({ type, message }) => {
    console.log(type)
    wss.clients.forEach((client) => {
      if (client.readyState === client.OPEN) {
        console.log('open')
        console.log(type)
        client.send(JSON.stringify({ type, data: message }));
      }
    });
  });

  wss.on('connection', (ws) => {
    console.log('New client connected');
    ws.send(JSON.stringify({
      type: 'initial_messages',
      data: repository.fetchAllMessages(),
    }));

    ws.on('close', () => {
      console.log('Client disconnected');
    });
  });

  return wss;
};
