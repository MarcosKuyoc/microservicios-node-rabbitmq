import { Payment, STATUS } from "./payment";


export interface PaymentRepository {
  insert(payment: Payment): Promise<Payment>;
  update(transactionId: string, status: STATUS): Promise<string>;
}