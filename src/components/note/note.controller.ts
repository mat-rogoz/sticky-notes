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

export const createNoteHandler = async (req: Request, res: Response) => {
  const { title, message } = req.query as Record<string, string>;

  try {
    const note = await createNote(title, message);

    return res.status(201).send(note);
  } catch (e) {
    logger.error(e);
    if (e instanceof Error) {
      return res.status(409).send(ErrorResponse(409, e.message));
    }
    return res.status(409).send(e);
  }
};

export const getNoteHandler = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const note = await getSingleNote(id);

    return res.status(200).send(note);
  } catch (e) {
    logger.error(e);
    return res.status(404).send(ErrorResponse(404, 'Element does not exist'));
  }
};

export const getAllNotesHandler = async (req: Request, res: Response) => {
  const { page, limit } = req.query as Record<string, string>;

  const paginationData = await pagination(req, parseInt(page), parseInt(limit));
  const notes = await getNotes(paginationData.limit, paginationData.offset);

  return res.status(200).send({
    links: paginationData.links,
    count: notes.length,
    result: notes,
  });
};

export const updateNoteHandler = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, message } = req.query as Record<string, string>;

  try {
    const note = await getSingleNote(id);
    await updateNote(id, note, title, message);
    const updatedNote = await getSingleNote(id);

    return res.status(200).send(updatedNote);
  } catch (e) {
    logger.error(e);
    return res.status(404).send(ErrorResponse(404, 'Element does not exist'));
  }
};

export const deleteNoteHandler = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await getSingleNote(id);
    await deleteNote(id);

    return res.status(200).send({
      success: true,
    });
  } catch (e) {
    logger.error(e);
    return res.status(404).send(ErrorResponse(404, 'Element does not exist'));
  }
};
