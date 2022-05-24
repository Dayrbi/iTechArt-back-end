import { Router } from 'express';
import {
  getAllFilms, getOneFilm, getFilmsForCinema, getFilmsBySearch, getFilmInfoForCheckout,
} from '../controllers/filmController';

export const filmsRouter = Router();

filmsRouter.get('/getAllFilms', getAllFilms);
filmsRouter.get('/getFilm', getOneFilm);
filmsRouter.get('/getFilmsForCinema', getFilmsForCinema);
filmsRouter.get('/getFilmsBySearch', getFilmsBySearch);
filmsRouter.get('/getFilmInfoForCheckout', getFilmInfoForCheckout);
