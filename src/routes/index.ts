import { Router } from 'express';
import { userRoutes } from '../app/modules/user/user.routes';
import { academicSemesterRoute } from '../app/modules/academicSemester/academicSemester.route';
import { studentRoutes } from '../app/modules/student/student.routes';

const router = Router();

const moduleRoute = [
  {
    path: '/user',
    route: userRoutes,
  },
  {
    path: '/academic-semester',
    route: academicSemesterRoute,
  },
  {
    path: '/student',
    route: studentRoutes,
  },
];

moduleRoute.forEach((x) => router.use(x.path, x.route));

export default router;
