import { Router } from 'express';
import {
  createSession, getFilmSessions, getSessionInfo, updateCinemaHall,
} from '../controllers/sessionController';

export const sessionsRouter = Router();

sessionsRouter.post('/createSession', createSession);
sessionsRouter.get('/getFilmSessions', getFilmSessions);
sessionsRouter.get('/getSessionInfo', getSessionInfo);
sessionsRouter.put('/updateCinemaHall', updateCinemaHall);
