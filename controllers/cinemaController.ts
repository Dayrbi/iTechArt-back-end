import { Response, Request } from 'express';
import { CinemaReq, CinemaData } from '../middleware/cinema.middlewars';
import { Cinema } from '../models/Cinema';

export const getAllCinemas = async (req: Request, res: Response): Promise<void> => {
  try {
    const cinemas = await Cinema.find({}).populate('sessions');
    if (!cinemas) {
      res.status(400).send('There are no cinemas');
      return;
    }
    const data = cinemas.map(({ title, address, sessions }: CinemaData) => ({ title, address, sessions }));
    res.status(200).send(data);
  } catch (e) {
    const msg = (e as Error).message;
    res.status(500).send(msg);
  }
};
export const createCinema = async (req: CinemaReq, res: Response): Promise<void> => {
  try {
    const { title, address, city } = req.body;
    const duplicate = await Cinema.findOne({ title });
    if (duplicate) {
      res.status(400).send('Cinema already exists');
      return;
    }
    const cinema = await Cinema.create({ title, address, city });
    await cinema.save();
    res.status(201).send('Cinema was created');
  } catch (e) {
    const msg = (e as Error).message;
    res.status(500).send(msg);
  }
};
export const getCinemasByCity = async (req: Request, res: Response): Promise<void> => {
  try {
    const { city } = req.query;
    const cinemas = await Cinema.find({ city }).populate('sessions');
    if (!cinemas) {
      res.status(400).send('There are no cinemas in this city');
      return;
    }
    res.status(200).send(cinemas);
  } catch (e) {
    const msg = (e as Error).message;
    res.status(500).send(msg);
  }
};
export const getCinemaByName = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title } = req.query;
    const cinema = await Cinema.findOne({ title }).populate('sessions');
    if (!cinema) {
      res.status(400).send('There is no cinema');
      return;
    }
    res.status(200).send(cinema);
  } catch (e) {
    const msg = (e as Error).message;
    res.status(500).send(msg);
  }
};
