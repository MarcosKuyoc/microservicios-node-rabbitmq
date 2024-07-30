import { Store, StoreRepository, STATUS } from '../../domain';
import StoreModel from './models/store.model';

export class StoreInfrastructure implements StoreRepository {
  async insert(payment: Store): Promise<Store> {
    await StoreModel.create(payment);
    return payment;
  }

  async update(transactionId: string, status: STATUS): Promise<string> {
    await StoreModel.findOneAndUpdate({ transactionId }, { status });
    return status;
  }
}