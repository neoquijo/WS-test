import { MessageService } from '../../core/services/MessageService';
import { mock } from 'jest-mock-extended';
import { Message } from '../../core/entities/Message';
import { MessageRepository } from '../../repositories/MessageRepository';

describe('MessageService', () => {
  let messageService: MessageService;
  let messageRepositoryMock: jest.Mocked<MessageRepository>;

  beforeEach(() => {
    messageRepositoryMock = mock<MessageRepository>();
    messageService = new MessageService(messageRepositoryMock);
  });

  it('should create and store a new message', () => {
    const messageContent = 'Test message';
    const newMessage = new Message(1, messageContent);

    messageRepositoryMock.addMessage.mockReturnValue(newMessage);

    const result = messageService.createMessage(messageContent);

    expect(result).toEqual(newMessage);
    expect(messageRepositoryMock.addMessage).toHaveBeenCalledWith(messageContent);
  });

  it('should fetch all messages from the repository', () => {
    const messages = [
      new Message(1, 'Message 1'),
      new Message(2, 'Message 2'),
    ];

    messageRepositoryMock.fetchAllMessages.mockReturnValue(messages);

    const result = messageService.fetchMessages();

    expect(result).toEqual(messages);
    expect(messageRepositoryMock.fetchAllMessages).toHaveBeenCalled();
  });
});
