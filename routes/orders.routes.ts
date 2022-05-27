import { Router } from 'express';
import { createOrder, getOneOrder } from '../controllers/orderController';

export const ordersRouter = Router();

ordersRouter.post('/createOrder', createOrder);
ordersRouter.get('/getOneOrder', getOneOrder);
