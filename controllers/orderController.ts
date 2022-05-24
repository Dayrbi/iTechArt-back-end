import axios from 'axios';
import { Response, Request } from 'express';
import config from 'config';
import { OrderCreateReq } from '../middleware/order.middlewars';
import { Order } from '../models/Order';
import { User } from '../models/User';

export const createOrder = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      placeArr, foodArr, filmId, amount, time, date, cinemaName, city, orderFilmImg, filmTitle, userId,
    }:OrderCreateReq = req.body;
    const user = await User.findOne({ _id: userId });
    if (!user) {
      res.status(400).send('User doesn\'t exist');
      return;
    }
    const order = await Order.create({
      placeArr, foodArr, filmId, amount, time, date, cinemaName, city, imgSrc: orderFilmImg, filmTitle,
    });
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
export const getOneOrder = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id, filmId } = req.query;
    const order = await Order.findOne({ _id: id }).populate('userId');
    if (!order) {
      res.status(400).send('Order doesn\'t exist');
      return;
    }
    const url: string = `${config.get('baseURl')}/${filmId}?api_key=${config.get('apiKey')}`;
    const filmInfo = await axios.get(url);
    const { poster_path }: {poster_path: string} = filmInfo.data;
    const img: string = `https://www.themoviedb.org/t/p/w600_and_h900_face${poster_path}`;
    order.imgSrc = img;
    console.log(order.imgSrc);
    res.status(200).send([order]);
  } catch (e) {
    const msg = (e as Error).message;
    res.status(500).send(msg);
  }
};
