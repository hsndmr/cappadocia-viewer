import { createServer } from 'http';
import { Server as SocketServer } from 'socket.io';
import { EventEmitter } from 'events';
import { ServerOptions } from './Server.interface';

export class Server {
  constructor(
    protected httpServer: ReturnType<typeof createServer>,
    protected io: SocketServer,
    protected eventEmitter: EventEmitter,
    protected options: ServerOptions
  ) {
    this.listen();
    this.handleEvent();
  }

  protected listen() {
    this.httpServer.listen(this.options.listenOptions);
  }

  protected handleEvent() {
    this.eventEmitter.on('event', (data) => {
      this.io.emit('event', data);
    });
  }

  close() {
    this.eventEmitter.removeAllListeners('event');
    this.httpServer.close();
  }
}
