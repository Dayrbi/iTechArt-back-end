import { Router } from 'express';

const filmsController = require('../controllers/filmController.ts');

const router = Router();

router.get('/allFilms', filmsController.getAllFilms);
router.get('/filmInfo', filmsController.getOneFilm);
module.exports = router;
