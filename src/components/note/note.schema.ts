import { number, object, string } from 'yup';

const STRING_MIN_LENGTH = 1;
const STRING_MAX_LENGTH = 255;
const TITLE_MISSING_ERROR = 'The title parameter is missing';
const MESSAGE_MISSING_ERROR = 'The message parameter is missing';
const ID_MISSING_ERROR = 'The id parameter is missing';

export const createNoteSchema = object({
  query: object({
    title: string()
      .min(STRING_MIN_LENGTH)
      .max(STRING_MAX_LENGTH)
      .required(TITLE_MISSING_ERROR),
    message: string()
      .min(STRING_MIN_LENGTH)
      .max(STRING_MAX_LENGTH)
      .required(MESSAGE_MISSING_ERROR),
  }),
});

export const updateNoteSchema = object({
  query: object({
    title: string().min(STRING_MIN_LENGTH).max(STRING_MAX_LENGTH),
    message: string().min(STRING_MIN_LENGTH).max(STRING_MAX_LENGTH),
  }),
  params: object({
    id: number().integer().min(0).required(ID_MISSING_ERROR),
  }),
});

export const getSingleNoteSchema = object({
  params: object({
    id: number().integer().min(0).required(ID_MISSING_ERROR),
  }),
});

export const deleteNoteSchema = object({
  params: object({
    id: number().integer().min(0).required(ID_MISSING_ERROR),
  }),
});

export const getNotesSchema = object({
  query: object({
    limit: number().integer().min(1).max(50),
    page: number().integer().min(1),
  }),
});
