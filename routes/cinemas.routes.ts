const Router = require('express');
const cinemaController = require('../controllers/cinemaController.ts');

const router = Router();
router.get('/allCinemas', cinemaController.getAllCinemas);
router.post('/cinemasSet', cinemaController.createCinemas);
module.exports = router;
