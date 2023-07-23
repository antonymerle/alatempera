import mongoose, { Schema, model } from "mongoose";
import { ImageOrientation } from "@/types/types";

type Type = "original" | "print";

export interface IWork {
  _id: string;
  title_fr: string;
  title_en: string;
  medium_fr: string;
  medium_en: string;
  mediumWidth: number;
  mediumHeight: number;
  description_fr: string;
  description_en: string;
  priceHT: number;
  priceTTC: number;
  inventory: number;
  isSoldOut: boolean;
  pictures: IPicture[];
  type: Type;
  format: ImageOrientation;
}

export interface IPicture {
  src: string;
  width: number;
  height: number;
  alt_fr: string;
  alt_en: string;
}

// Sous document inclus dans OrderSchema
export const PictureSchema = new Schema<IPicture>({
  src: { type: String, required: true },
  width: { type: Number, required: true },
  height: { type: Number, required: true },
  alt_fr: { type: String, required: true },
  alt_en: { type: String, required: true },
});

const WorkSchema = new Schema<IWork>({
  title_fr: { type: String, required: true },
  title_en: { type: String, required: true },
  medium_fr: { type: String, required: true },
  medium_en: { type: String, required: true },
  mediumWidth: { type: Number, required: true },
  mediumHeight: { type: Number, required: true },
  description_fr: { type: String, required: false },
  description_en: { type: String, required: false },
  priceHT: { type: Number, required: true },
  priceTTC: { type: Number, required: true },
  inventory: { type: Number, required: true },
  pictures: { type: [PictureSchema], required: true },
  isSoldOut: { type: Boolean, required: true },
  type: { type: String, required: true },
  format: { type: String, required: false },
});

const Work = mongoose.models.Work || model<IWork>("Work", WorkSchema);

export default Work;
