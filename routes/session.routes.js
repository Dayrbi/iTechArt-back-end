import { Router } from 'express';
import { createSession, getFilmSessions, getSessionInfo } from '../controllers/sessionController';

export const sessionsRouter = Router();

sessionsRouter.post('/createSession', createSession);
sessionsRouter.get('/getFilmSessions', getFilmSessions);
sessionsRouter.get('/getSessionInfo', getSessionInfo);
