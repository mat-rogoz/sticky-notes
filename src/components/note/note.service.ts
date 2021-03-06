import { getRepository } from 'typeorm';
import { Note } from './note.entity';

export const createNote = async (
  title: string,
  message: string,
): Promise<Note> => {
  const noteRepository = getRepository(Note);
  const note = noteRepository.create();
  note.title = title;
  note.message = message;
  return noteRepository.save(note);
};

export const getSingleNote = async (noteId: string): Promise<Note> => {
  const noteRepository = getRepository(Note);
  return noteRepository.findOneOrFail({ where: { id: noteId } });
};

export const getNotes = async (
  limit: number,
  offset: number,
): Promise<Note[]> => {
  const noteRepository = getRepository(Note);
  return noteRepository.find({
    order: {
      createdAt: 'DESC',
    },
    take: limit,
    skip: offset,
  });
};

export const countAllNotes = async (): Promise<number> => {
  const noteRepository = getRepository(Note);
  return noteRepository.count();
};

export const updateNote = async (
  noteId: string,
  payload: Record<string, string>,
): Promise<any> =>
  getRepository(Note)
    .createQueryBuilder()
    .update(Note, payload)
    .where('id = :id', { id: noteId })
    .execute();

export const deleteNote = async (noteId: string): Promise<void> => {
  const noteRepository = getRepository(Note);
  noteRepository
    .createQueryBuilder()
    .delete()
    .from(Note)
    .where('id = :id', { id: noteId })
    .execute();
};
