import { Router } from 'express';
import { AuthRoutes } from './auth.routes';
import { countryRoutes } from './location/country.routes';
import { StateRoutes } from './location/state.routes';
import { cityRoutes } from './location/city.routes';

export const APIRoutes = Router();

APIRoutes.get('/', (req, res) => {
  res.send("Inside API call");
});

APIRoutes.use('/auth', AuthRoutes);
APIRoutes.use('/location/country', countryRoutes)
APIRoutes.use('/location/state', StateRoutes)
APIRoutes.use('/location/city', cityRoutes)