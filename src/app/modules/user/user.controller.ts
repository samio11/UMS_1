import { StatusCodes } from 'http-status-codes';
import { catchASync } from '../../utils/catchAsync';
import { sendResponse } from '../../utils/sendResponse';
import { userServices } from './user.service';

const C_create_student = catchASync(async (req, res) => {
  const { password, payload } = req.body;
  const result = await userServices.createStudentIntoDb(password, payload);
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: 'Student created Done',
    data: result,
  });
});

export const userController = { C_create_student };
