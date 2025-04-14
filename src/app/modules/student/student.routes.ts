import express from 'express';
import { studentControllers } from './student.controller';

const router = express.Router();

router.get('/get-all-student', studentControllers.C_getallStudentData);

export const studentRoutes = router;
