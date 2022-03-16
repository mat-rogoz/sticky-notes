import { NextFunction, Request, Response } from 'express';
import { object, string, mixed } from 'yup';
import { OptionalObjectSchema } from 'yup/lib/object';
import { ErrorResponse } from '../utils/error-response';

const CALLBACK_MISSING_ERROR = 'The callback parameter is missing';
const WRONG_FORMAT_ERROR = 'Unsupported format';
const WRONG_CALLBACK_TYPE_ERROR = 'Callback must be a function';

const isFunction = (arg: string | undefined): boolean => {
  if (!arg) return true;

  const fn = eval(arg);
  if (typeof fn === 'function') return true;

  return false;
};

const commonSchema = object({
  query: object({
    format: string().oneOf(['jsonp'], WRONG_FORMAT_ERROR),
    callback: mixed()
      .test('isFunction', WRONG_CALLBACK_TYPE_ERROR, (value) =>
        isFunction(value),
      )
      .when('format', {
        is: (value: string | undefined) => !!value,
        then: mixed().required(CALLBACK_MISSING_ERROR),
      }),
  }),
});

const validateRequest =
  (routeSchema: OptionalObjectSchema<any>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    const schema = commonSchema.concat(routeSchema);
    schema
      .validate({
        body: req.body,
        query: req.query,
        params: req.params,
      })
      .then(() => next())
      .catch((e) => {
        res.status(400).send(ErrorResponse(400, e.message));
      });
  };

export default validateRequest;
