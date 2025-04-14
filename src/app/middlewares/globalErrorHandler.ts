import { ErrorRequestHandler } from 'express';
import { TErrorSources } from '../interfaces/error.interface';
import { ZodError } from 'zod';
import { handleZodError } from '../error/handleZodError';
import { handleCastError } from '../error/handleCastError';
import { handleValidationError } from '../error/handleValidationError';
import { handleDuplicateError } from '../error/handleDuplicateError';
import AppError from '../error/AppError';
import config from '../config';

export const globalErrorHandler: ErrorRequestHandler = (
  err,
  req,
  res,
  next,
) => {
  let statusCode = 500;
  let message = 'something on server error';
  let errorSources: TErrorSources = [
    {
      path: '',
      message: 'Opps! something wrong',
    },
  ];

  if (err instanceof ZodError) {
    const x = handleZodError(err);
    statusCode = x.statusCode;
    message = x.message;
    errorSources = x.errorSources;
  } else if (err?.name === 'CastError') {
    const x = handleCastError(err);
    statusCode = x.statusCode;
    message = x.message;
    errorSources = x.errorSources;
  } else if (err?.name === 'VAlidationError') {
    const x = handleValidationError(err);
    statusCode = x.statusCode;
    message = x.message;
    errorSources = x.errorSources;
  } else if (err?.code === 11000) {
    const x = handleDuplicateError(err);
    statusCode = x.statusCode;
    message = x.message;
    errorSources = x.errorSources;
  } else if (err instanceof AppError) {
    statusCode = 400;
    message = err?.message;
    errorSources = [
      {
        path: '',
        message: err?.message,
      },
    ];
  } else if (err instanceof Error) {
    message = err?.message;
    errorSources = [
      {
        path: '',
        message: err?.message,
      },
    ];
  }
  return res.status(statusCode).json({
    success: false,
    message,
    errorSources,
    stack: config.NODE_ENV === 'development' ? err?.stack : null,
  });
};
