import { NextFunction, Request, Response } from 'express';

const responseFormatter = (req: Request, res: Response, next: NextFunction) => {
  const { format, callback } = req.query as Record<string, string>;
  if (format === 'jsonp' && callback) {
    res.json = (body) => {
      return res.jsonp.call(res, body);
    };
  }
  next();
};

export default responseFormatter;
