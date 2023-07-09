import mongoose, { Schema, model } from "mongoose";
import { IWork } from "./works";
import { PictureSchema } from "./works";

const PrintSchema = new Schema<IWork>({
  title_fr: { type: String, required: true },
  title_en: { type: String, required: true },
  description_fr: { type: String, required: false },
  description_en: { type: String, required: false },
  priceHT: { type: Number, required: true },
  priceTTC: { type: Number, required: true },
  inventory: { type: Number, required: true },
  pictures: { type: [PictureSchema], required: true },
  isSoldOut: { type: Boolean, required: true },
  type: { type: String, required: true },
});

const Print = mongoose.models.Print || model<IWork>("Print", PrintSchema);

export default Print;
