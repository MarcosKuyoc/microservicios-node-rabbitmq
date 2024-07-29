import mongoose, { Schema, Model } from "mongoose";
import { Auth } from "../../../domain/auth";

class AuthModel {
  private readonly authSchema: Schema<Auth>;

  constructor() {
    this.authSchema = new Schema<Auth>({
      name: {
        type: String,
        required: true,
        trim: true,
      },
      email: {
        type: String,
        required: true,
        trim: true,
        unique: true
      },
      password: {
        type: String,
        required: true,
        trim: true,
      },
      refreshToken: {
        type: String,
        required: true,
        trim: true,
      }
    });
  }
  
  get model(): Model<Auth> {
    return mongoose.model<Auth>('Auth', this.authSchema);
  }
}

export default new AuthModel().model;