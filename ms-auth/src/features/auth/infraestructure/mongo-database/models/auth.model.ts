import mongoose, { Schema, Model } from "mongoose";

class AuthModel {
  private readonly authSchema: Schema;

  constructor() {
    this.authSchema = new Schema({
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
  
  get model(): Model<any> {
    return mongoose.model('Auth', this.authSchema);
  }
}

export default new AuthModel().model;