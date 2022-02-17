import { Express, Response } from 'express';
import validateRequest from './middlewere/validate-request';
import {
  createNoteSchema,
  deleteNoteSchema,
  getNoteSchema,
  updateNoteSchema,
} from './components/note/note.schema';
import {
  createNoteHandler,
  deleteNoteHandler,
  getAllNotesHandler,
  getNoteHandler,
  updateNoteHandler,
} from './components/note/note.controller';
import { object } from 'yup';

const routes = (app: Express) => {
  app.get('/health', ({}, res: Response) => res.sendStatus(200));

  app.get('/v1/notes', validateRequest(object({})), getAllNotesHandler);
  app.get('/v1/notes/:id', validateRequest(getNoteSchema), getNoteHandler);
  app.post('/v1/notes', validateRequest(createNoteSchema), createNoteHandler);
  app.put(
    '/v1/notes/:id',
    validateRequest(updateNoteSchema),
    updateNoteHandler,
  );
  app.delete(
    '/v1/notes/:id',
    validateRequest(deleteNoteSchema),
    deleteNoteHandler,
  );

  app.get('/v1/ping', validateRequest(object({})), ({}, res: Response) => {
    res.status(200).send({
      pong: true,
    });
  });
};

export default routes;
