import { Schema, model } from 'mongoose';

const sessionSchema = new Schema({
  filmName: { type: String, required: true },
  filmGenres: { type: Array, required: true },
  filmCountryName: { type: String, required: false },
  filmId: { type: Number, required: true },
  date: { type: Date, required: true },
  time: { type: Array, required: true },
  price: { type: Number, required: true },
  food: { type: Array, required: false },
  cinemaId: [{ type: Schema.Types.ObjectId, ref: 'Cinema' }],
  cinemaName: { type: String, required: false },
});
export const Session = model('Session', sessionSchema);
