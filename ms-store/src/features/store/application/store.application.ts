import { STATUS } from "../domain/store";
import { StoreRepository } from "../domain/store.repository";

export class PaymentApplication {
  readonly repositoryStore: StoreRepository;

  constructor(
    repositoryStore: StoreRepository,
  ) {
    this.repositoryStore = repositoryStore;
  }

  async update(transactionId: string, status: STATUS): Promise<string> {
    return this.repositoryStore.update(transactionId, status);
  }
}