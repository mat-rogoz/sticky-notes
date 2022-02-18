import { Request, Response } from 'express';
import { ErrorResponse } from '../../utils/error-response';
import logger from '../../utils/logger';
import pagination from '../../utils/pagination';
import {
  createNote,
  deleteNote,
  getNotes,
  getSingleNote,
  updateNote,
} from './note.service';

export const createNoteHandler = (req: Request, res: Response) => {
  const { title, message } = req.query as Record<string, string>;

  createNote(title, message)
    .then((note) => res.status(201).send(note))
    .catch((e) => {
      logger.error(e);
      return res.status(409).send(ErrorResponse(409, e.message));
    });
};

export const getNoteHandler = (req: Request, res: Response) => {
  const { id } = req.params;

  getSingleNote(id)
    .then((note) => res.status(200).send(note))
    .catch((e) => {
      logger.error(e);
      return res.status(404).send(ErrorResponse(404, 'Element does not exist'));
    });
};

export const getAllNotesHandler = async (req: Request, res: Response) => {
  const { page, limit } = req.query as Record<string, string>;

  const paginationData = await pagination(req, parseInt(page), parseInt(limit));

  getNotes(paginationData.limit, paginationData.offset).then((notes) =>
    res.status(200).send({
      links: paginationData.links,
      count: notes.length,
      result: notes,
    }),
  );
};

export const updateNoteHandler = (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, message } = req.query as Record<string, string>;

  getSingleNote(id)
    .then((note) => updateNote(note, id, title, message))
    .then(() => getSingleNote(id))
    .then((note) => res.status(200).send(note))
    .catch((e) => {
      logger.error(e);
      return res.status(404).send(ErrorResponse(404, 'Element does not exist'));
    });
};

export const deleteNoteHandler = (req: Request, res: Response) => {
  const { id } = req.params;

  getSingleNote(id)
    .then(() => deleteNote(id))
    .then(() =>
      res.status(200).send({
        success: true,
      }),
    )
    .catch((e) => {
      logger.error(e);
      return res.status(404).send(ErrorResponse(404, 'Element does not exist'));
    });
};
