import mongoose from 'mongoose';
import { TErrorSources, TGenericError } from '../interfaces/error.interface';

export const handleCastError = (
  err: mongoose.Error.CastError,
): TGenericError => {
  const errorSources: TErrorSources = [
    {
      path: err?.path,
      message: err?.path,
    },
  ];
  const statusCode = 400;
  return {
    statusCode,
    message: 'Invalid->Cast Error',
    errorSources,
  };
};
