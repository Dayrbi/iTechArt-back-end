import { Response, Request } from 'express';
import axios from 'axios';
import config from 'config';
import { FilmsData, FilmDescription, CinemaFilms } from '../middleware/films.midlewars';

export const getAllFilms = async (req: Request, res: Response): Promise<void> => {
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
export const getOneFilm = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.query;
    const url: string = `${config.get('baseURl')}/${id}?api_key=${config.get('apiKey')}`;
    const urlForActors: string = `${config.get('baseURl')}/${id}/credits?api_key=${config.get('apiKey')}`;
    const filmInfo = await axios.get(url);
    const filmActors = await axios.get(urlForActors);
    if (!filmInfo && filmActors) {
      res.status(503).send('Server Error');
      return;
    }
    const actorsArr = filmActors.data.cast.map((actor: {name: string}) => (actor.name)).slice(0, 4);
    const paramArr = Array.of(filmInfo.data);
    const params = paramArr.map(({
      production_countries, release_date, runtime, genres, overview, budget, title, poster_path,
    } : FilmDescription) => {
      const countryName: string = production_countries[0].name;
      const img: string = `https://www.themoviedb.org/t/p/w600_and_h900_face/${poster_path}`;
      const actors: string[] = actorsArr;
      return ({
        countryName, release_date, runtime, genres, overview, budget, title, img, actors,
      });
    });
    res.status(200).send(params);
  } catch (e) {
    const msg = (e as Error).message;
    res.status(500).send(msg);
  }
};
export const getFilmsForCinema = async (req: Request, res: Response): Promise<void> => {
  try {
    const url: string = `${config.get('baseURl')}/now_playing?api_key=${config.get('apiKey')}&region=PL`;
    const filmsArr = await axios.get(url);
    if (!filmsArr) {
      res.status(503).send('Server Error');
      return;
    }
    const filmData = filmsArr.data.results.map(({ title, id }: CinemaFilms) => ({ title, id }));
    res.status(200).send(filmData);
  } catch (e) {
    const msg = (e as Error).message;
    res.status(500).send(msg);
  }
};
export const getFilmsBySearch = async (req: Request, res: Response): Promise<void> => {
  try {
    const { filmName } = req.query;
    const url: string = `https://api.themoviedb.org/3/search/movie?api_key=${config.get('apiKey')}&query=${filmName}`;
    const filmsArr = await axios.get(url);
    if (!filmsArr) {
      res.status(503).send('Server Error');
      return;
    }
    const filmData = filmsArr.data.results.map(({
      title, id, poster_path, vote_average,
    } : FilmsData) => {
      const img: string = `https://www.themoviedb.org/t/p/w220_and_h330_face/${poster_path}`;
      return ({
        title, id, img, vote_average,
      });
    });
    res.status(200).send(filmData);
  } catch (e) {
    const msg = (e as Error).message;
    res.status(500).send(msg);
  }
};
