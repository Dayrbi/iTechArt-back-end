import { Router } from 'express';

const filmsController = require('../controllers/filmController.ts');

const router = Router();

router.get('/getAllFilms', filmsController.getAllFilms);
router.get('/getFilm', filmsController.getOneFilm);
router.get('/getFilmsForCinema', filmsController.getFilmsForCinema);
module.exports = router;
