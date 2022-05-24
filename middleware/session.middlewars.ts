import { Request } from 'express';

export interface SessionReq extends Request {
    filmName: string;
    filmGenres: string;
    filmCountryName: string;
    filmId: number;
    date: Date;
    time: string[];
    price: number;
    food: string[];
    cinemaName: string;
    cinemaHall: string[];
}
