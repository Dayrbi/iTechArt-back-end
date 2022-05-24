import { Router } from 'express';
import { createOrder } from '../controllers/orderController';

export const ordersRouter = Router();

ordersRouter.post('/createOrder', createOrder);
