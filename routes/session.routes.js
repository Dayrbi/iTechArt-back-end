import { Router } from 'express';
import { createSession, getFilmSessions } from '../controllers/sessionController';

export const sessionsRouter = Router();

sessionsRouter.post('/createSession', createSession);
sessionsRouter.get('/getFilmSessions', getFilmSessions);
