import { Router } from 'express';
import { getAllFilms, getOneFilm, getFilmsForCinema } from '../controllers/filmController';

export const filmsRouter = Router();

filmsRouter.get('/getAllFilms', getAllFilms);
filmsRouter.get('/getFilm', getOneFilm);
filmsRouter.get('/getFilmsForCinema', getFilmsForCinema);
