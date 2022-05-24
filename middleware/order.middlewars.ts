import { Request } from 'express';

export interface OrderCreateReq extends Request {
    placeArr: string[];
    foodArr: string[];
    filmId: number;
    filmTitle: string;
    amount: number;
    time: string;
    date: string;
    cinemaName: string;
    city: string;
    orderFilmImg: string;
    userId: number;
}
