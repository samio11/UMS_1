import mongoose from 'mongoose';
import { AcademicSemesterNameCodeMapper } from './academicSemester.contant';
import { TAcademicSemester } from './academicSemester.interface';
import AcademicSemester from './academicSemester.model';
import AppError from '../../error/AppError';
import { StatusCodes } from 'http-status-codes';

const createAcademicSemesterIntoDB = async (payload: TAcademicSemester) => {
  if (AcademicSemesterNameCodeMapper[payload.name] !== payload.code) {
    throw new Error('Invalid Semester Code');
  }
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const result = await AcademicSemester.create([payload], { session });
    if (!result.length) {
      throw new AppError(
        StatusCodes.BAD_REQUEST,
        'Failed to create AdmissionSemester',
      );
    } else {
      await session.commitTransaction();
      await session.endSession();
      return result;
    }
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(StatusCodes.BAD_REQUEST, err);
  }
};

// const createAcademicSemesterIntoDB = async (payload: TAcademicSemester) => {
//   const result = await AcademicSemester.create(payload);
//   return result;
// };

const getAllAcademicSemesterDb = async () => {
  const result = await AcademicSemester.find();
  return result;
};
const getAAcademicSemesterDb = async (id: string) => {
  const result = await AcademicSemester.findById(id);
  return result;
};

const deleteAcademicSemesterDb = async (id: string) => {
  const result = await AcademicSemester.findByIdAndDelete(id);
  return result;
};

const updateAnAcademicSemesterDb = async (
  id: string,
  payload: TAcademicSemester,
) => {
  if (
    payload.name &&
    payload.code &&
    AcademicSemesterNameCodeMapper[payload.name] !== payload.code
  ) {
    throw new Error('Invalid Semester Code');
  }
  const result = await AcademicSemester.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return result;
};

export const AcademicSemesterServices = {
  createAcademicSemesterIntoDB,
  getAllAcademicSemesterDb,
  getAAcademicSemesterDb,
  deleteAcademicSemesterDb,
  updateAnAcademicSemesterDb,
};
