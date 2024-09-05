import express from 'express';
import { createServer } from 'http';
import request from 'supertest';
import { MessageService } from '../../core/services/MessageService';

import { MessageRepository } from '../../repositories/MessageRepository';

const applyRoutes = (app: express.Express, messageService: MessageService) => {
  app.use(express.json());

  app.post('/messages', (req, res) => {
    const { content } = req.body;
    if (!content) {
      return res.status(400).send({ error: 'Content is required' });
    }

    const newMessage = messageService.createMessage(content);
    res.status(201).send(newMessage);
  });

  app.get('/messages', (req, res) => {
    console.log(req.method)
    res.send(messageService.fetchMessages());
  });
};

describe('Message API & WebSocket', () => {
  let app: express.Express;
  let server: ReturnType<typeof createServer>;
  let messageRepository: MessageRepository;
  let messageService: MessageService;

  beforeEach(() => {
    app = express();
    server = createServer(app);

    messageRepository = new MessageRepository(3);
    messageService = new MessageService(messageRepository);

    applyRoutes(app, messageService);

  });


  it('should add a new message via HTTP POST and notify via WebSocket', () => {
    const client = new WebSocket(`ws://localhserver.listen(0);ost:${4000}`);

    client.onopen = () => {
      request(server)
        .post('/messages')
        .send({ content: 'Hello WebSocket' })
        .expect(201)
        .then((response) => {
          expect(response.body.content).toBe('Hello WebSocket');
        });
    };

  });

  it('should fetch all messages via HTTP GET', async () => {
    await request(server).post('/messages').send({ content: 'Message 1' });
    await request(server).post('/messages').send({ content: 'Message 2' });

    const response = await request(server).get('/messages');

    expect(response.status).toBe(200);
    expect(response.body.length).toBe(2);
    expect(response.body[0].content).toBe('Message 1');
    expect(response.body[1].content).toBe('Message 2');
  });
});
