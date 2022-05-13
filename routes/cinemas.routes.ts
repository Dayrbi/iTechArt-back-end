import { Router } from 'express';
import {
  createCinema, getAllCinemas, getCinemasByFilter, getFilterParams, updateCinemaHall,
} from '../controllers/cinemaController';

export const cinemasRouter = Router();

cinemasRouter.get('/getAllCinemas', getAllCinemas);
cinemasRouter.get('/getCinemasByFilter', getCinemasByFilter);
cinemasRouter.get('/getFilterParams', getFilterParams);
cinemasRouter.post('/createCinema', createCinema);
cinemasRouter.put('/updateCinemaHall', updateCinemaHall);
