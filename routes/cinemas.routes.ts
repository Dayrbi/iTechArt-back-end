import { Router } from 'express';
import {
  createCinema, getAllCinemas, getCinemasCity, getCinemasName,
} from '../controllers/cinemaController';

export const cinemasRouter = Router();

cinemasRouter.get('/getAllCinemas', getAllCinemas);
cinemasRouter.get('/getCinemasCity', getCinemasCity);
cinemasRouter.get('/getCinemasName', getCinemasName);
cinemasRouter.post('/createCinema', createCinema);
