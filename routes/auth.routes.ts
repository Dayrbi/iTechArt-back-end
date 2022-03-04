import { Router } from "express";
const authController = require('../controllers/authController.ts');

const router = Router();

router.post('/register', authController.create);
router.post('/login', authController.login);
router.get('/login', authController.authUser);
module.exports = router;
