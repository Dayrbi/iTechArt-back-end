import { Response, Request } from 'express';
import { CinemaReq, CinemaData } from '../middleware/cinema.middlewars';
import { Cinema } from '../models/Cinema'

exports.getAllCinemas = async (req: Request, res: Response): Promise<void> => {
  try {
    const cinemas = await Cinema.find({});
    if (!cinemas) {
      res.status(400).send('There are no cinemas');
      return;
    }
    const data = cinemas.map(({ title, address }: CinemaData) => ({ title, address }));
    res.status(200).send(data);
  } catch (e) {
    const msg = (e as Error).message;
    res.status(500).send(msg);
  }
};
exports.createCinemas = async (req: CinemaReq, res: Response): Promise<void> => {
  try {
    const { title, address } = req.body;
    const duplicate = await Cinema.findOne({ title });
    if (duplicate) {
      res.status(400).send('Cinema already exists');
      return;
    }
    const cinema = await Cinema.create({ title, address });
    await cinema.save();
    res.status(201).send('Cinema was created');
  } catch (e) {
    const msg = (e as Error).message;
    res.status(500).send(msg);
  }
};
