import express, { Request, Response } from 'express';
import 'reflect-metadata';
import { createConnection } from 'typeorm';
import config from './../config/default';
import logger from './utils/logger';

const app = express();
const port = config.port;

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

app.on('ready', () => {
  app.listen(port, () => {
    logger.info(`Sticky Notes app listening on port ${port}`);
  });
});

createConnection()
  .then(() => {
    logger.info('Connected to database');
    app.emit('ready');
  })
  .catch((err) => logger.error(err));
