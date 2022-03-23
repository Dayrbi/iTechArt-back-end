import { Router } from 'express';

const filmsController = require('../controllers/filmController.ts');

const router = Router();

router.get('/allFilms', filmsController.getAllFilms);
router.get('/filmInfo', filmsController.getOneFilm);
router.get('/cinemaFilm', filmsController.getFilmsForCinema);
module.exports = router;
