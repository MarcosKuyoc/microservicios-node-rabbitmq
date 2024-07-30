import mongoose, { Schema, Model } from "mongoose";
import { Payment } from "../../../domain/payment";

class PaymentModel {
  private readonly paymentSchema: Schema<Payment>;

  constructor() {
    this.paymentSchema = new Schema<Payment>({
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

  get model(): Model<Payment> {
    return mongoose.model("Payment", this.paymentSchema);
  }
}

export default new PaymentModel().model;