import mongoose from 'mongoose';
import config from '../../config';
import { TStudent } from '../student/student.interface';
import { TUser } from './user.interface';
import User from './user.model';
import AppError from '../../error/AppError';
import { StatusCodes } from 'http-status-codes';
import Student from '../student/student.model';
import { v4 as uuidv4 } from 'uuid';
import AcademicSemester from '../academicSemester/academicSemester.model';
import { getStudentId } from './user.utils';
import { TAcademicSemester } from '../academicSemester/academicSemester.interface';

const createStudentIntoDb = async (password: string, payload: TStudent) => {
  const userData: Partial<TUser> = {};
  userData.password = password || (config.default_password as string);
  userData.role = 'student';

  const session = await mongoose.startSession();
  try {
    await session.startTransaction();

    // find academic semester info
    const admissionSemester = await AcademicSemester.findById(
      payload.admissionSemester,
    );

    //set  generated id
    userData.id = await getStudentId(admissionSemester);

    console.log(userData.id, userData);

    const newUser = await User.create([userData], { session });
    if (!newUser.length) {
      throw new AppError(StatusCodes.BAD_GATEWAY, 'Failed to create User');
    }

    payload.id = newUser[0].id;
    payload.user = newUser[0]._id;

    const newStudent = await Student.create([payload], { session });
    if (!newStudent.length) {
      throw new AppError(StatusCodes.BAD_GATEWAY, 'Failed to create Student');
    }

    await session.commitTransaction();
    await session.endSession();

    return newStudent;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err as string);
  }
};

export const userServices = { createStudentIntoDb };
