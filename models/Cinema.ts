import { Schema, model } from 'mongoose';

const cinemasSchema = new Schema({
  title: { type: String, required: true },
  address: { type: String, required: true },
});
export const Cinema = model('cinema', cinemasSchema);
