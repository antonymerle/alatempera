import mongoose, { Schema, model } from "mongoose";
import { PrivilegeLevel } from "../types/types";

export interface IUser {
  _id: string;
  providerId: string;
  provider: string;
  given_name: string;
  family_name: string;
  email: string;
  password: string;
  pp: string;
  privilegeLevel: PrivilegeLevel;
}

export const UserSchema = new Schema<IUser>({
  providerId: { type: String, required: true },
  provider: { type: String, required: true },
  given_name: { type: String, required: true },
  family_name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: false },
  pp: { type: String, required: false },
  privilegeLevel: { type: String, required: true },
});

const User = mongoose.models.User || model<IUser>("User", UserSchema);

export default User;
