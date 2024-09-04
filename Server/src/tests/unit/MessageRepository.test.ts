import { MessageRepository } from '../../repositories/MessageRepository';

describe('RingBufferMessageRepository', () => {
  it('should add a message and return it', () => {
    const repository = new MessageRepository(3);
    const message = repository.addMessage('Hello World');

    const messages = repository.fetchAllMessages();

    expect(messages.length).toBe(1);
    expect(messages[0].content).toBe('Hello World');
    expect(messages[0].id).toBe(message.id);
  });

  it('should not exceed the buffer capacity', () => {
    const repository = new MessageRepository(3);
    repository.addMessage('Message 1');
    repository.addMessage('Message 2');
    repository.addMessage('Message 3');
    repository.addMessage('Message 4');

    const messages = repository.fetchAllMessages();

    expect(messages.length).toBe(3);
    expect(messages[0].content).toBe('Message 2');
    expect(messages[1].content).toBe('Message 3');
    expect(messages[2].content).toBe('Message 4');
  });

  it('should correctly handle messages exceeding capacity', () => {
    const repository = new MessageRepository(2);
    repository.addMessage('Message 1');
    repository.addMessage('Message 2');
    repository.addMessage('Message 3');

    const messages = repository.fetchAllMessages();

    expect(messages.length).toBe(2);
    expect(messages[0].content).toBe('Message 2');
    expect(messages[1].content).toBe('Message 3');
  });
});
