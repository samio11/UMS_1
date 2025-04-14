import express from 'express';
import { academicSemesterControllers } from './academicSemester.controller';

const route = express.Router();

route.post(
  '/create-academicSemester',
  academicSemesterControllers.createAcademicSemester,
);
route.get(
  '/get-academicSemester',
  academicSemesterControllers.getAllAcademicSemester,
);
route.get(
  '/get-a-academicSemester/:id',
  academicSemesterControllers.getAAcademicSemester,
);

export const academicSemesterRoute = route;
