import { Schema, Model, model, Document } from 'mongoose';

interface IUser {
  id: string;
  name: string;
  password: string;
  email: string;
}

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true }
  },
  {
    timestamps: true
  }
);

export const User: Model<IUser & Document> = model('User', userSchema);
