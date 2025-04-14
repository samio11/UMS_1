import { TAcademicSemester } from '../academicSemester/academicSemester.interface';
import User from './user.model';

const findLatestStudent = async () => {
  const latestStudent = await User.findOne(
    {
      role: 'student',
    },
    {
      id: 1,
      _id: 0,
    },
  )
    .sort({ createdAt: -1 })
    .lean();
  return latestStudent?.id ? latestStudent.id.substring(6) : undefined;
};

export const getStudentId = async (payload: TAcademicSemester) => {
  const currentid = (await findLatestStudent()) || (0).toString();
  let incrementedID = Number(currentid + 1)
    .toString()
    .padStart(4, '0');
  incrementedID = `${payload.year}${payload.code}${incrementedID}`;
  return incrementedID;
};
