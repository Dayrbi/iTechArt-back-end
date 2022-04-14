import { Request, Response } from 'express';
import { SessionReq } from '../middleware/session.middlewars';
import { Cinema } from '../models/Cinema';
import { Session } from '../models/Session';

export const createSession = async (req: SessionReq, res: Response): Promise<void> => {
  try {
    const {
      filmName, filmGenres, filmCountryName, filmId, date, time, price, food, cinemaName,
    } = req.body;
    const session = await Session.create({
      filmName, filmGenres, filmCountryName, filmId, date, time, price, food,
    });
    const cinema = await Cinema.findOne({ title: cinemaName });
    if (!cinema) {
      res.status(400).send('Cinema doesn\'t exist');
      return;
    }
    cinema.sessions.push(session._id);
    session.cinemaId.push(cinema._id);
    await cinema.save();
    await session.save();
    res.status(201).send('session was created');
  } catch (e) {
    const msg = (e as Error).message;
    res.status(500).send(msg);
  }
};
export const getFilmSessions = async (req: Request, res: Response) => {
  try {
    const { id } = req.query;
    const sessions = await Session.find({ filmId: id }).populate('cinemaId');
    if (!sessions) {
      res.status(400).send('Sessions doesn\'t exist');
      return;
    }
    res.status(200).send(sessions);
  } catch (e) {
    const msg = (e as Error).message;
    res.status(500).send(msg);
  }
};
