import { Request } from 'express';

export interface CinemaReq extends Request {
    title?: string;
    address?: string;
    city?: string;
}
export interface CinemaData {
    title: string;
    address: string;
    sessions: Array<object>;
    date?: string[];
    city: string;
}
export interface SearchData {
    title?: string;
    date?: string;
    city?: string;
}
export interface SearchReqData {
    theatreParam?: string;
    cityParam?: string;
    dateParam?: any;
}
