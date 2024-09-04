import { Message } from "../entities/Message";

export interface IMessageRepository {
  addMessage(content: string): Message;
  getAllMessages(): Message[];
}