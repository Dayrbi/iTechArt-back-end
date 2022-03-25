const Router = require('express');
const cinemaController = require('../controllers/cinemaController.ts');

const router = Router();
router.get('/getAllCinemas', cinemaController.getAllCinemas);
router.post('/createCinema', cinemaController.createCinema);
module.exports = router;
