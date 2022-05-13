import { Response, Request } from 'express';
import { OrderCreateReq } from '../middleware/order.middlewars';
import { Order } from '../models/Order';
import { User } from '../models/User';

export const createOrder = async (req: Request, res: Response) => {
  try {
    const {
      placeArr, foodArr, filmId, amount, time, date, cinemaName, city, imgSrc, filmTitle, userId,
    }:OrderCreateReq = req.body;
    const order = await Order.create({
      placeArr, foodArr, filmId, amount, time, date, cinemaName, city, imgSrc, filmTitle,
    });
    const user = await User.findOne({ _id: userId });
    if (!user) {
      res.status(400).send('User doesn\'t exist');
      return;
    }
    order.userId.push(userId);
    user.orders.push(order._id);
    await order.save();
    await user.save();
    res.status(201).send('Order was created');
  } catch (e) {
    const msg = (e as Error).message;
    res.status(500).send(msg);
  }
};
