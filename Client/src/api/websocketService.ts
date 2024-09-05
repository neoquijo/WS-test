export class WebSocketService {
  private socket: WebSocket | null = null;

  connect(url: string) {
    this.socket = new WebSocket(url);
  }

  disconnect() {
    if (this.socket) {
      this.socket.close();
    }
  }

  sendMessage(type: string, data: unknown) {
    if (this.socket) {
      this.socket.send(JSON.stringify({ type, data }));
    }
  }

}
