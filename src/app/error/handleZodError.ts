import { ZodError, ZodIssue } from 'zod';
import { TErrorSources, TGenericError } from '../interfaces/error.interface';

export const handleZodError = (err: ZodError): TGenericError => {
  const errorSources: TErrorSources = err?.issues?.map((x: ZodIssue) => {
    return {
      path: x?.path[x?.path?.length - 1],
      message: x?.message,
    };
  });
  const statusCode = 400;
  return {
    statusCode,
    message: 'Invalid->Zod Error',
    errorSources,
  };
};
