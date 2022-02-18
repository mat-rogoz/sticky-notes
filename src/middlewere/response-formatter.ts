import { NextFunction, Request, Response } from 'express';

const responseFormatter = (req: Request, res: Response, next: NextFunction) => {
  const { format, callback } = req.query as Record<string, string>;
  if (format === 'jsonp' && callback) {
    // eslint-disable-next-line no-param-reassign
    res.json = (body) => res.jsonp.call(res, body);
  }
  next();
};

export default responseFormatter;
