import { Subject } from 'rxjs';
import { Message } from '../core/entities/Message';

export class MessageRepository {
  private buffer: Message[];
  private start: number;
  private end: number;
  private size: number;
  private readonly capacity: number;

  private messageSubject = new Subject<{ type: 'added' | 'removed', message: Message }>();
  public message$ = this.messageSubject.asObservable();

  constructor(capacity: number) {
    this.capacity = capacity;
    this.buffer = new Array(capacity);
    this.start = 0;
    this.end = 0;
    this.size = 0;
  }

  addMessage(content: string): Message {
    const message = new Message(Date.now(), content);

    if (this.size === this.capacity) {
      const removedMessage = this.buffer[this.start];
      this.buffer[this.start] = message;
      this.start = (this.start + 1) % this.capacity;
      this.messageSubject.next({ type: 'removed', message: removedMessage });
    } else {
      this.buffer[this.end] = message;
      this.size++;
    }

    this.end = (this.end + 1) % this.capacity;
    this.messageSubject.next({ type: 'added', message });
    return message;
  }

  fetchAllMessages(): Message[] {
    const messages = [];
    for (let i = 0; i < this.size; i++) {
      const index = (this.start + i) % this.capacity;
      messages.push(this.buffer[index]);
    }
    return messages;
  }
}
