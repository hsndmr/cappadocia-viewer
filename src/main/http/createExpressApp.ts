import express, { Response, NextFunction } from 'express';
import { EventEmitter } from 'events';
import { v4 as uuidv4 } from 'uuid';
import bodyParser from 'body-parser';
import { Request } from './Server.interface';

export function viewerPostHandler(req: Request, res: Response) {
  const { context, ...rest } = req.body;
  req.eventEmitter?.emit('event', {
    ...rest,
    uuid: uuidv4(),
    context: context ? JSON.stringify(context) : '',
  });

  res.send('').status(201);
}

export function createEventEmitterMiddleware(eventEmitter: EventEmitter) {
  return (req: Request, res: Response, next: NextFunction) => {
    req.eventEmitter = eventEmitter;
    next();
  };
}

export default function createExpressApp(eventEmitter: EventEmitter) {
  const app = express();

  app.use(bodyParser.json());
  app.use(createEventEmitterMiddleware(eventEmitter));

  app.post('/viewer', viewerPostHandler);

  return app;
}
