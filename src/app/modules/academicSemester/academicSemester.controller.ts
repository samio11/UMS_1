import { StatusCodes } from 'http-status-codes';
import { catchASync } from '../../utils/catchAsync';
import { sendResponse } from '../../utils/sendResponse';
import { AcademicSemesterServices } from './academicSemester.service';

const createAcademicSemester = catchASync(async (req, res) => {
  const result = await AcademicSemesterServices.createAcademicSemesterIntoDB(
    req.body,
  );
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: 'Academic Semester Created',
    data: result,
  });
});

const getAllAcademicSemester = catchASync(async (req, res) => {
  const result = await AcademicSemesterServices.getAllAcademicSemesterDb();
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Academic Semester Data fetched Successfully',
    data: result,
  });
});

const getAAcademicSemester = catchASync(async (req, res) => {
  const id = req?.params.id;
  const result = await AcademicSemesterServices.getAAcademicSemesterDb(id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Getting A Academic Semester Data fetched Successfully',
    data: result,
  });
});

export const academicSemesterControllers = {
  createAcademicSemester,
  getAllAcademicSemester,
  getAAcademicSemester,
};
