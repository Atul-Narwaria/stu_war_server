import { Router } from 'express';
import { AuthRoutes } from './auth.routes';
import { countryRoutes } from './location/country.routes';
import { StateRoutes } from './location/state.routes';
import { cityRoutes } from './location/city.routes';
import { test } from '../controller/institute/instituteContoller';
import { InstitueRoutes } from './institute/institute.routes';
import { InstitueStudentRoutes } from './institute/student.routes';

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

APIRoutes.get("/test", async (req, res) => {
  let d = await test();
  return res.status(200).json(d)
})