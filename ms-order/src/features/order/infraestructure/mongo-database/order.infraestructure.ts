import { Order, OrderRepository, STATUS } from "../../domain";
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