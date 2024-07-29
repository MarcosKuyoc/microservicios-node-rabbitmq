import joi from "joi";

export const orderSchema = {
  INSERT: {
    body: joi.object({
      userId: joi.string().required(),
      productId: joi.string().required(),
      productName: joi.string().required(),
      productCount: joi.number().min(2).max(450),
      transactionId: joi.string().min(10).max(50),
    }),
  },
};