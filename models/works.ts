import mongoose, { Schema, model } from "mongoose";
import { ImageOrientation } from "@/types/types";

type Type = "original" | "print";

export interface IWork {
  _id: string;
  title: string;
  description_fr: string;
  description_en: string;
  priceHT: number;
  priceTTC: number;
  inventory: number;
  imgURL: string[];
  isSoldOut: boolean;
  type: Type;
  format: ImageOrientation;
}

const workSchema = new Schema<IWork>({
  title: { type: String, required: true },
  description_fr: { type: String, required: false },
  description_en: { type: String, required: false },
  priceHT: { type: Number, required: true },
  priceTTC: { type: Number, required: true },
  inventory: { type: Number, required: true },
  imgURL: { type: [String], required: true },
  isSoldOut: { type: Boolean, required: true },
  type: { type: String, required: true },
  format: { type: String, required: false },
});

const Work = mongoose.models.Work || model<IWork>("Work", workSchema);

export default Work;
