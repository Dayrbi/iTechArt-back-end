import { Response, Request } from 'express';
import axios from 'axios';
import config from 'config';
import { FilmsData, FilmDescription, CinemaFilms } from '../middleware/films.midlewars';

exports.getAllFilms = async (req: Request, res: Response): Promise<void> => {
  try {
    const url: string = `${config.get('baseURl')}/popular?api_key=${config.get('apiKey')}`;
    const filmsArr = await axios.get(url);
    if (!filmsArr) {
      res.status(503).send('Server Error');
      return;
    }
    const params = filmsArr.data.results.map(({ title, id, poster_path } : FilmsData) => {
      const img: string = `https://www.themoviedb.org/t/p/w220_and_h330_face/${poster_path}`;
      return ({ title, id, img });
    });
    res.status(200).send(params);
  } catch (e) {
    const msg = (e as Error).message;
    res.status(500).send(msg);
  }
};
exports.getOneFilm = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.query;
    const url: string = `${config.get('baseURl')}/${id}?api_key=${config.get('apiKey')}`;
    const filmInfo = await axios.get(url);
    if (!filmInfo) {
      res.status(503).send('Server Error');
      return;
    }
    const paramArr = Array.of(filmInfo.data);
    const params = paramArr.map(({
      production_countries, release_date, runtime, genres, overview, budget,
    } : FilmDescription) => {
      const countryName: string = production_countries[0].name;
      return ({
        countryName, release_date, runtime, genres, overview, budget,
      });
    });
    res.status(200).send(params);
  } catch (e) {
    const msg = (e as Error).message;
    res.status(500).send(msg);
  }
};
exports.getFilmsForCinema = async (req: Request, res: Response): Promise<void> => {
  try {
    const url: string = `${config.get('baseURl')}/now_playing?api_key=${config.get('apiKey')}&region=PL`;
    const filmsArr = await axios.get(url);
    if (!filmsArr) {
      res.status(503).send('Server Error');
      return;
    }
    const dataFilm = filmsArr.data.results.map(({ title, id }: CinemaFilms) => ({ title, id }));
    res.status(200).send(dataFilm);
  } catch (e) {
    const msg = (e as Error).message;
    res.status(500).send(msg);
  }
};