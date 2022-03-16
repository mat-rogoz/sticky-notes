import { Express, Response } from 'express';
import { object } from 'yup';
import validateRequest from './middleware/validate-request';
import {
  createNoteSchema,
  deleteNoteSchema,
  getNotesSchema,
  getSingleNoteSchema,
  updateNoteSchema,
} from './components/note/note.schema';
import {
  createNoteHandler,
  deleteNoteHandler,
  getAllNotesHandler,
  getNoteHandler,
  updateNoteHandler,
} from './components/note/note.controller';

const routes = (app: Express) => {
  app.get('/health', (_, res: Response) => res.sendStatus(200));

  app.get('/v1/notes', validateRequest(getNotesSchema), getAllNotesHandler);
  app.post('/v1/notes', validateRequest(createNoteSchema), createNoteHandler);
  app.get(
    '/v1/notes/:id',
    validateRequest(getSingleNoteSchema),
    getNoteHandler,
  );
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

  app.get('/v1/ping', validateRequest(object({})), (_, res: Response) => {
    res.status(200).send({
      pong: true,
    });
  });
};

export default routes;
