
import { MessageRepository } from '../../repositories/MessageRepository';
import { Message } from '../entities/Message';

export class MessageService {
  private repository: MessageRepository;

  constructor(repository: MessageRepository) {
    this.repository = repository;
  }

  createMessage(content: string): Message {
    return this.repository.addMessage(content);
  }

  fetchMessages(): Message[] {
    return this.repository.fetchAllMessages();
  }
}
