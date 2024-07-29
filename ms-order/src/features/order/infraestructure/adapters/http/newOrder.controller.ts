import { Request, Response } from "express";
import { OrderApplication } from "../../../application/order.application";
import { Order } from "../../../domain/order";

export class NewOrderController {
  readonly application: OrderApplication;

  constructor(application: OrderApplication) {
    this.application = application;
    this.newOrder = this.newOrder.bind(this);
  }

  async newOrder(req: Request, res: Response) {
    const { userId, productId, productName, productCount, transactionId } = req.body;
    const order = new Order(
      userId,
      productId,
      productName,
      productCount,
      transactionId,
      "PENDING"
    );

    const orderCreated = await this.application.create(order);

    res.status(201).json(orderCreated);
  }
}