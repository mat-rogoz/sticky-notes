import express, { Request, Response } from 'express';
import 'reflect-metadata';
import { createConnection } from 'typeorm';
import config from './config/config';
import routes from './routes';
import logger from './utils/logger';

const app = express();
const port = config.port;

app.on('ready', () => {
  app.listen(port, () => {
    logger.info(`Sticky Notes app listening on port ${port}`);
    routes(app);
  });
});

createConnection()
  .then(() => {
    logger.info('Connected to database');
    app.emit('ready');
  })
  .catch((err) => logger.error(err));
