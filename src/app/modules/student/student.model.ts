import mongoose, { model, Schema } from 'mongoose';
import {
  TGuardian,
  TLocalGuardian,
  TName,
  TStudent,
} from './student.interface';

const studentName = new Schema<TName>({
  firstName: { type: String, required: true },
  middleName: { type: String, required: true },
  lastName: { type: String, required: true },
});

const guardianSchema = new Schema<TGuardian>({
  fatherName: { type: String, required: [true, 'Father Name is required'] },
  fatherOccupation: {
    type: String,
    required: [true, 'Father Occupation is required'],
  },
  fatherContactNo: {
    type: String,
    required: [true, 'Father Contact Number is required'],
  },
  motherName: { type: String, required: [true, 'mother Name is required'] },
  motherContactNo: {
    type: String,
    required: [true, 'mother Contact No is required'],
  },
  motherOccupation: {
    type: String,
    required: [true, 'mother Occupation is required'],
  },
});

const localGuardianSchema = new Schema<TLocalGuardian>({
  name: { type: String, required: [true, 'Local Guardian Name is required'] },
  occupation: {
    type: String,
    required: [true, 'Local Guardian Occupation is required'],
  },
  contactNo: {
    type: String,
    required: [true, 'Local Guardian Contact No is required'],
  },
  address: {
    type: String,
    required: [true, 'Local Guardian Address is required'],
  },
});

const studentSchema = new Schema<TStudent>(
  {
    id: {
      type: String,
      required: [true, 'Student Special id is required'],
      unique: true,
    },
    user: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
    name: { type: studentName },
    email: { type: String, required: true, unique: true },
    gender: {
      type: String,
      enum: {
        values: ['male', 'female'],
        message: '{VALUE} is not valid gender',
      },
    },
    dateOfBirth: { type: Date, required: true },
    contactNo: { type: String, required: true },
    emergencyContactNo: { type: String, required: true },
    presentAddress: { type: String, required: true },
    permanentAddress: { type: String, required: true },
    bloodGroup: {
      type: String,
      enum: {
        values: ['A+', 'A-', 'O+', 'O-', 'B+', 'B-'],
        message: '{VALUE} not a valid blood Group',
      },
    },
    guardian: { type: guardianSchema },
    localGuardian: { type: localGuardianSchema },
    profileImage: { type: String, required: true },
    admissionSemester: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'AcademicSemester',
    },
    academicDepartment: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'AcademicDepartment',
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  },
);

studentSchema.virtual('fullName').get(function () {
  return this?.name?.firstName + this?.name?.middleName + this?.name?.lastName;
});

const Student = model<TStudent>('Student', studentSchema);
export default Student;
