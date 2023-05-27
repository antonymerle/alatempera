import mongoose, { Schema, model } from "mongoose";

export interface IWork {
  title: string;
  description: string;
  priceHT: number;
  priceTTC: number;
  qty: number;
  imgURL: string[];
}

const workSchema = new Schema<IWork>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  priceHT: { type: Number, required: true },
  priceTTC: { type: Number, required: true },
  qty: { type: Number, required: true },
  imgURL: { type: [String], required: true },
});

const Work = mongoose.models.Work || model<IWork>("Work", workSchema);

export default Work;
