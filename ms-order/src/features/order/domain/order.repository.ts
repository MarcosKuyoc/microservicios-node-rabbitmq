import { Order, STATUS } from "./order";

export default interface OrderRepository {
  insert(order: Order): Promise<Order>;
  update(transactionId: string, status: STATUS): Promise<string>;
}