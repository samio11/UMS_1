import { StatusCodes } from 'http-status-codes';
import { catchASync } from '../../utils/catchAsync';
import { sendResponse } from '../../utils/sendResponse';
import { studentService } from './student.service';

const C_getallStudentData = catchASync(async (req, res) => {
  const result = await studentService.getStudentData();
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Getting All Student Data',
    data: result,
  });
});

export const studentControllers = { C_getallStudentData };
