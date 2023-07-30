import { Request as BaseRequest } from 'express-serve-static-core';
import { EventEmitter } from 'events';
import { ListenOptions } from 'net';

export interface Request extends BaseRequest {
  eventEmitter?: EventEmitter;
}
export interface ServerOptions {
  listenOptions: ListenOptions;
}
