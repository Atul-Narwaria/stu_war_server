import { Router } from 'express';
import { AuthRoutes } from './auth.routes';
import { countryRoutes } from './location/country.routes';
import { StateRoutes } from './location/state.routes';
import { cityRoutes } from './location/city.routes';
import { test } from '../controller/institute/instituteContoller';
import { InstitueRoutes } from './institute/institute.routes';
import { InstitueStudentRoutes } from './institute/student.routes';
import { InstitueTeacherRoutes } from './institute/teacher.routes';
import { CourseRoutes } from './course/course.routes';
import { SubCourseRoutes } from './course/subCourse.routes';
import { batchRoutes } from './batch/batch.routes';
import { batchLinkRoutes } from './batch/batchLink.routes';

export const APIRoutes = Router();

APIRoutes.get('/', (req, res) => {
  res.send("Inside API call");
});

APIRoutes.use('/auth', AuthRoutes);
APIRoutes.use('/location/country', countryRoutes)
APIRoutes.use('/location/state', StateRoutes)
APIRoutes.use('/location/city', cityRoutes)
APIRoutes.use('/institute', InstitueRoutes);
APIRoutes.use('/institute/student', InstitueStudentRoutes);
APIRoutes.use('/institute/teacher', InstitueTeacherRoutes);
APIRoutes.use('/institute/course', CourseRoutes);
APIRoutes.use('/institute/sub-course', SubCourseRoutes);
APIRoutes.use('/institute/batch', batchRoutes);
APIRoutes.use('/institute/batch-link', batchLinkRoutes);
APIRoutes.get("/test", async (req, res) => {
  let d = await test();
  return res.status(200).json(d)
})