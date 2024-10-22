
import { EnvironmentVariables } from "../../../config/app.config";
import { BrokerRepository, Order, OrderRepository, STATUS } from "../domain";


export class OrderApplication {
  readonly repositoryOrder: OrderRepository;
  readonly repositoryBroker: BrokerRepository;

  constructor(
    repositoryOrder: OrderRepository,
    repositoryBroker: BrokerRepository
  ) {
    this.repositoryOrder = repositoryOrder;
    this.repositoryBroker = repositoryBroker;
  }

  async create(order: Order): Promise<Order> {
    const result = await this.repositoryOrder.insert(order);
    await this.repositoryBroker.send({
      type: EnvironmentVariables.QUEUE_ORDER_CREATED_EVENT,
      data: result,
    });

    return result;
  }

  async update(transactionId: string, status: STATUS): Promise<string> {
    return this.repositoryOrder.update(transactionId, status);
  }
}
