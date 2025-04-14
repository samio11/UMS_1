import Student from './student.model';

const getStudentData = async () => {
  const result = await Student.find().populate('admissionSemester');
  return result;
};

export const studentService = { getStudentData };
