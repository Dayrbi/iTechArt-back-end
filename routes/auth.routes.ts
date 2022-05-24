import { Router } from 'express';
import {
  createUser, userLogin, authUser, getUser,
} from '../controllers/authController';

export const authRouter = Router();

authRouter.post('/register', createUser);
authRouter.post('/login', userLogin);
authRouter.get('/login', authUser);
authRouter.get('/getUser', getUser);
