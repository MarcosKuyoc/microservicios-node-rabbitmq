import mongoose, { Schema, Model } from "mongoose";
import { Order } from "../../../domain/order";

class OrderModel {
  private readonly orderSchema: Schema<Order>;

  constructor() {
    this.orderSchema = new Schema<Order>({
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
    });
  }

  get model(): Model<Order> {
    return mongoose.model("Order", this.orderSchema);
  }
}

export default new OrderModel().model;