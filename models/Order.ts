import { Schema, model } from 'mongoose';

const ordersSchema = new Schema({
  placeArr: { type: Array, required: true },
  foodArr: { type: Array, required: true },
  filmId: { type: Number, required: false },
  filmTitle: { type: String, required: true },
  amount: { type: Number, required: true },
  time: { type: Date, required: true },
  date: { type: Date, required: true },
  cinemaName: { type: String, required: true },
  city: { type: String, required: true },
  imgSrc: { type: String, required: true },
  userId: [{ type: Schema.Types.ObjectId, ref: 'User' }],

});
export const Order = model('Order', ordersSchema);
