import { Request } from 'express';

export interface CustomRequest extends Request {
    email?: string;
    password?: string;
    username?: string;
}
