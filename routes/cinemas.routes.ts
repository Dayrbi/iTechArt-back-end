import { Router } from 'express';
import {
  createCinema, getAllCinemas, getCinemasByCity, getCinemaByName,
} from '../controllers/cinemaController';

export const cinemasRouter = Router();

cinemasRouter.get('/getAllCinemas', getAllCinemas);
cinemasRouter.get('/getCinemasCity', getCinemasByCity);
cinemasRouter.get('/getCinemasName', getCinemaByName);
cinemasRouter.post('/createCinema', createCinema);
