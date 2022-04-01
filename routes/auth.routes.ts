import { Router } from 'express';
import { createUser, userLogin, authUser } from '../controllers/authController';

export const authRouter = Router();

authRouter.post('/register', createUser);
authRouter.post('/login', userLogin);
authRouter.get('/login', authUser);
