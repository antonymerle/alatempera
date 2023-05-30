import mongoose, { Schema, model } from "mongoose";

export interface IWork {
  _id: string;
  title: string;
  description: string;
  priceHT: number;
  priceTTC: number;
  inventory: number;
  imgURL: string[];
  isSoldOut: boolean;
}

const workSchema = new Schema<IWork>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  priceHT: { type: Number, required: true },
  priceTTC: { type: Number, required: true },
  inventory: { type: Number, required: true },
  imgURL: { type: [String], required: true },
  isSoldOut: { type: Boolean, required: true },
});

const Work = mongoose.models.Work || model<IWork>("Work", workSchema);

export default Work;
