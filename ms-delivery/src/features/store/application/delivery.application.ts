import { STATUS } from "../domain/delivery";
import { DeliveryRepository } from "../domain/delivery.repository";

export class PaymentApplication {
  readonly repositoryStore: DeliveryRepository;

  constructor(
    repositoryStore: DeliveryRepository,
  ) {
    this.repositoryStore = repositoryStore;
  }

  async update(transactionId: string, status: STATUS): Promise<string> {
    return this.repositoryStore.update(transactionId, status);
  }
}