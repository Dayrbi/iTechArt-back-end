import { Request } from 'express';

export interface CinemaReq extends Request {
    title: string;
    address?: string;
}
export interface CinemaCollect {
    title: string;
    address: string;
}
