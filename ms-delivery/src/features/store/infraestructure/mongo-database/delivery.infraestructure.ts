import { Delivery, DeliveryRepository, STATUS } from '../../domain';
import DeliveryModel from './models/delivery.model';

export class DeliveryInfrastructure implements DeliveryRepository {
  async insert(delivery: Delivery): Promise<Delivery> {
    await DeliveryModel.create(delivery);
    return delivery;
  }

  async update(transactionId: string, status: STATUS): Promise<string> {
    await DeliveryModel.findOneAndUpdate({ transactionId }, { status });
    return status;
  }
}