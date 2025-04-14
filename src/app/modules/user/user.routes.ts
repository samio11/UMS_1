import express from 'express';
import { validateRequest } from '../../middlewares/validateRequest';
import { validateUser } from './user.validation';
import { userController } from './user.controller';

const router = express.Router();
router.post('/create-student', userController.C_create_student);

export const userRoutes = router;
