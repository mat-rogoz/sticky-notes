import { NextFunction, Request, Response } from 'express';
import { OptionalObjectSchema } from 'yup/lib/object';

const validateRequest =
  (schema: OptionalObjectSchema<any>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validate({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      return next();
    } catch (e) {
      res.status(400).send(`${e.name}: ${e.message}`);
    }
  };

export default validateRequest;
