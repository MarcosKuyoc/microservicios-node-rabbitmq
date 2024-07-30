import mongoose, { Schema, Model } from "mongoose";
import { Delivery } from "../../../domain/delivery";

class DeliveryModel {
  private readonly deliverySchema: Schema<Delivery>;

  constructor() {
    this.deliverySchema = new Schema<Delivery>({
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
      deliveryStatus: {
        type: String,
        required: true,
      },
    });
  }

  get model(): Model<Delivery> {
    return mongoose.model("delivery", this.deliverySchema);
  }
}

export default new DeliveryModel().model;