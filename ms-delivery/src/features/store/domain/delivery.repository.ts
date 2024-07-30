import { Delivery, STATUS } from "./delivery";

export interface DeliveryRepository {
  insert(store: Delivery): Promise<Delivery>;
  update(transactionId: string, status: STATUS): Promise<string>;
}