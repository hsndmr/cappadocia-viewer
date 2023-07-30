import { EventEmitter } from 'events';
import { createServer as createHttpServer } from 'http';
import { Server as SocketServer } from 'socket.io';
import createExpressApp from './createExpressApp';
import { Server } from './Server';

export default function createServer() {
  const eventEmitter = new EventEmitter();
  const app = createExpressApp(eventEmitter);
  const httpServer = createHttpServer(app);
  const io = new SocketServer(httpServer, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST'],
    },
  });
  return new Server(httpServer, io, eventEmitter, {
    listenOptions: {
      port: 9091,
      host: '127.0.0.1',
    },
  });
}
