import { Request } from 'express';

export interface CinemaReq extends Request {
    title: string;
    address?: string;
}
export interface CinemaData {
    title: string;
    address: string;
}
