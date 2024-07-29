
import { Order, STATUS } from "../../domain/order";
import OrderRepository from "../../domain/order.repository";
import OrderModel from './models/order.model';

export class OrderInfrastructure implements OrderRepository {
  async insert(order: Order): Promise<Order> {
    await OrderModel.create(order);
    return order;
  }

  async update(transactionId: string, status: STATUS): Promise<string> {
    await OrderModel.findOneAndUpdate({ transactionId }, { status });
    return status;
  }
}