import { Store, STATUS } from "./store";


export interface StoreRepository {
  insert(store: Store): Promise<Store>;
  update(transactionId: string, status: STATUS): Promise<string>;
}