import { model, Schema } from 'mongoose';
import { TAcademicSemester } from './academicSemester.interface';
import {
  AcademicSemesterCode,
  AcademicSemesterName,
  Months,
} from './academicSemester.contant';

const academicSemesterSchema = new Schema<TAcademicSemester>(
  {
    name: { type: String, required: true, enum: AcademicSemesterName },
    code: { type: String, required: true, enum: AcademicSemesterCode },
    year: { type: String, required: true },
    startMonth: { type: String, required: true, enum: Months },
    endMonth: { type: String, required: true, enum: Months },
  },
  {
    timestamps: true,
  },
);

academicSemesterSchema.pre('save', async function (next) {
  const isExists = await AcademicSemester.findOne({
    name: this.name,
    year: this.year,
  });
  if (isExists) {
    throw new Error('Semester is already exists');
  }
  next();
});

const AcademicSemester = model<TAcademicSemester>(
  'AcademicSemester',
  academicSemesterSchema,
);
export default AcademicSemester;
