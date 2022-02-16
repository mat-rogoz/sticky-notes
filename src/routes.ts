import { Express, Request, Response } from 'express';
import validateRequest from './middlewere/validate-request';
import { createNoteSchema } from './components/note/note.schema';
import { createNoteHandler } from './components/note/note.controller';

const routes = (app: Express) => {
  app.get('/health', (_, res: Response) => res.sendStatus(200));

  app.post('/v1/notes', validateRequest(createNoteSchema), createNoteHandler);
};

export default routes;
