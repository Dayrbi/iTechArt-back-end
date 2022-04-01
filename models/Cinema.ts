import { Schema, model } from 'mongoose';

const cinemasSchema = new Schema({
  title: { type: String, required: true },
  address: { type: String, required: true },
  sessions: [{ type: Schema.Types.ObjectId, ref: 'Session' }],
  city: { type: String, required: true },
});
export const Cinema = model('Cinema', cinemasSchema);
