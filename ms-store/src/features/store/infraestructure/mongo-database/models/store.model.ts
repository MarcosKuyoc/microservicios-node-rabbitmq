import mongoose, { Schema, Model } from "mongoose";
import { Store } from "../../../domain/store";

class StoreModel {
  private readonly storeSchema: Schema<Store>;

  constructor() {
    this.storeSchema = new Schema<Store>({
      userId: {
        type: String,
        required: true,
      },
      productId: {
        type: String,
        required: true,
      },
      productName: {
        type: String,
        required: true,
      },
      productCount: {
        type: Number,
        required: true,
      },
      transactionId: {
        type: String,
        required: true,
      },
      status: {
        type: String,
        required: true,
      },
      gateway: {
        type: String,
        required: true,
      },
      storeName: {
        type: String,
        required: true,
      },
    });
  }

  get model(): Model<Store> {
    return mongoose.model("Store", this.storeSchema);
  }
}

export default new StoreModel().model;