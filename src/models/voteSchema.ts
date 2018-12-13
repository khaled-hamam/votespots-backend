import { Schema, model } from 'mongoose';

const voteSchema = new Schema(
  {
    name: { type: String, required: true },
    header: { type: [String], required: true },
    results: { type: [Number] }
  },
  { timestamps: true }
);

export const Vote = model('Vote', voteSchema);
