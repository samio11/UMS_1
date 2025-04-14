import { Types } from 'mongoose';

export type TName = {
  firstName: string;
  middleName: string;
  lastName: string;
};

export type TGuardian = {
  fatherName: string;
  fatherOccupation: string;
  fatherContactNo: string;
  motherName: string;
  motherOccupation: string;
  motherContactNo: string;
};

export type TLocalGuardian = {
  name: string;
  contactNo: string;
  occupation: string;
  address: string;
};

export type TStudent = {
  id: string;
  user: Types.ObjectId;
  name: TName;
  email: string;
  gender: 'male' | 'female';
  dateOfBirth: Date;
  contactNo: string;
  emergencyContactNo: string;
  presentAddress: string;
  permanentAddress: string;
  bloodGroup: 'A+' | 'A-' | 'O+' | 'O-' | 'B+' | 'B-';
  guardian: TGuardian;
  localGuardian: TLocalGuardian;
  profileImage?: string;
  admissionSemester: Types.ObjectId;
  academicDepartment: Types.ObjectId;
};
