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

export const getAllNotes = async (): Promise<Note[]> => {
  const noteRepository = getRepository(Note);
  return noteRepository.find();
};

export const updateNote = async (
  note: Note,
  noteId: string,
  title: string | undefined,
  message: string | undefined,
): Promise<void> => {
  getRepository(Note)
    .createQueryBuilder()
    .update(Note)
    .set({
      title: title || note.title,
      message: message || note.message,
    })
    .where('id = :id', { id: noteId })
    .execute();
};

export const deleteNote = async (noteId: string): Promise<void> => {
  const noteRepository = getRepository(Note);
  noteRepository
    .createQueryBuilder()
    .delete()
    .from(Note)
    .where('id = :id', { id: noteId })
    .execute();
};
