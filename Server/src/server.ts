import express from 'express';
import { createServer } from 'http';
import { MessageService } from './core/services/MessageService';
import { setupWebSocketServer } from './utils/websocket';
import { MessageRepository } from './repositories/MessageRepository';
import cors from 'cors'
import path from 'path';

const app = express();

app.use(cors())

export const server = createServer(app);

const messageRepository = new MessageRepository(9);
const messageService = new MessageService(messageRepository);

setupWebSocketServer(server, messageRepository);

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.post('/messages', (req, res) => {
  const { content } = req.body;
  if (!content) {
    return res.status(400).send({ error: 'Content is required' });
  }

  const newMessage = messageService.createMessage(content);
  console.log(messageService.fetchMessages())
  res.status(201).send(newMessage);
});

app.get('/messages', (req, res) => {
  res.send(messageService.fetchMessages());
});
