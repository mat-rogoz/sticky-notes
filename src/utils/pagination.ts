import { Request } from 'express';
import { countAllNotes } from '../components/note/note.service';

type Pagination = {
  numberOfNotes: number;
  limit: number;
  offset: number;
  links: Record<string, string>;
};

const pagination = async (
  req: Request,
  requestedPage = 1,
  limit = 5,
): Promise<Pagination> => {
  const numberOfNotes = await countAllNotes();
  const lastPage = Math.ceil(numberOfNotes / limit);
  const page = requestedPage * limit > numberOfNotes ? lastPage : requestedPage;
  const offset = (page - 1) * limit;
  const host = req.get('host');
  const {path} = req;
  const links: { [k: string]: string } = {};

  if (page > 1) {
    links.previousPage = `//${host}${path}?page=${page - 1}&limit=${limit}`;
  }

  if (page < lastPage) {
    links.nextPage = `//${host}${path}?page=${page + 1}&limit=${limit}`;
  }

  return {
    numberOfNotes,
    limit,
    offset,
    links,
  };
};

export default pagination;
