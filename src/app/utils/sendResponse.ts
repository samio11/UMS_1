import { Response } from 'express';

export type TSuccessResponse<T> = {
  success: boolean;
  statusCode: number;
  message: string;
  data: T | T[] | null;
};

export const sendResponse = <T>(res: Response, data: TSuccessResponse<T>) => {
  return res.status(data?.statusCode).json({
    success: data?.success,
    message: data?.message,
    totalData: data?.data,
  });
};
