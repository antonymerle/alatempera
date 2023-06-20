import mongoose, { Schema, model } from "mongoose";
import { IWork } from "./works";

const printSchema = new Schema<IWork>({
  title: { type: String, required: true },
  description_fr: { type: String, required: false },
  description_en: { type: String, required: false },
  priceHT: { type: Number, required: true },
  priceTTC: { type: Number, required: true },
  inventory: { type: Number, required: true },
  imgURL: { type: [String], required: true },
  isSoldOut: { type: Boolean, required: true },
  type: { type: String, required: true },
});

const Print = mongoose.models.Print || model<IWork>("Print", printSchema);

export default Print;
