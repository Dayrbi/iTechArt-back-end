import { Schema, model } from 'mongoose';

const usersSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  orders: [{ type: Schema.Types.ObjectId, ref: 'User' }],
});
export const User = model('User', usersSchema);
