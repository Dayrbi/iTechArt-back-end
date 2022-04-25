import { Response, Request } from 'express';
import moment from 'moment-timezone';
import {
  CinemaReq, CinemaData, SearchData, SearchReqData,
} from '../middleware/cinema.middlewars';
import { Cinema } from '../models/Cinema';

export const getAllCinemas = async (req: Request, res: Response): Promise<void> => {
  try {
    const cinemas = await Cinema.find({}).populate('sessions');
    if (!cinemas) {
      res.status(400).send('There are no cinemas');
      return;
    }
    let dateArr: string[] = [];
    for (let i = 0; i < cinemas.length; i++) {
      dateArr = cinemas[i].sessions.map(((session:{date: string}) => moment(session.date).format()));
    }
    const { date } = { date: [...new Set(dateArr)] };
    const data: Array<CinemaData> = cinemas.map(({
      title, address, sessions, city,
    }) => ({
      title, address, sessions, date, city,
    }));
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
export const getCinemasByFilter = async (req: Request, res: Response): Promise<void> => {
  try {
    const result: Array<CinemaData> = [];
    const searchParam: SearchData = {};
    const { theatre, cityParam, dateParam }: SearchReqData = req.query;
    if (theatre) searchParam.title = theatre;
    if (cityParam) searchParam.city = cityParam;
    const cinemas = await Cinema.find(searchParam).populate('sessions');
    if (!cinemas) {
      res.status(400).send('There are no cinemas by search criterias');
      return;
    }
    let dateArr: string[] = [];
    for (let i = 0; i < cinemas.length; i++) {
      dateArr = cinemas[i].sessions.map(((session:{date: string}) => moment(session.date).format()));
    }
    const { date } = { date: [...new Set(dateArr)].sort() };
    if (dateParam) {
      cinemas.filter((cinema) => {
        cinema.sessions = cinema.sessions.filter((session: {date: string}) => moment(session.date).format('L') === moment(dateParam).format('L'));
        if (cinema.sessions.length) {
          result.push(cinema);
        }
      });
      const filterData: Array<CinemaData> = result.map(({
        title, address, sessions, city,
      }) => ({
        title, address, sessions, date, city,
      }));
      res.status(200).send(filterData);
      return;
    }
    const data: Array<CinemaData> = cinemas.map(({
      title, address, sessions, city,
    }) => ({
      title, address, sessions, date, city,
    }));
    res.status(200).send(data);
  } catch (e) {
    const msg = (e as Error).message;
    res.status(500).send(msg);
  }
};
export const getFilterParams = async (req: Request, res: Response) => {
  try {
    const cinemas = await Cinema.find({});
    if (!cinemas) {
      res.status(400).send('There are no cinemas');
      return;
    }
    const params = cinemas.map((cinema) => ({ title: cinema.title, city: cinema.city }));
    res.status(200).send(params);
  } catch (e) {
    const msg = (e as Error).message;
    res.status(500).send(msg);
  }
};
