import { Schema, model, Document, Model } from 'mongoose';
interface IVote {
  name: string;
  headers: string[];
  results: number[];
}
const voteSchema = new Schema(
  {
    name: { type: String, required: true },
    headers: { type: [String], required: true },
    results: { type: [Number] }
  },
  { timestamps: true }
);

export const Vote: Model<IVote & Document> = model('Vote', voteSchema);
