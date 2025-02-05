import { Payment, PaymentRepository, STATUS } from '../../domain';
import PaymentModel from './models/payment.model';

export class PaymentInfrastructure implements PaymentRepository {
  async insert(payment: Payment): Promise<Payment> {
    await PaymentModel.create(payment);
    return payment;
  }

  async update(transactionId: string, status: STATUS): Promise<string> {
    await PaymentModel.findOneAndUpdate({ transactionId }, { status });
    return status;
  }
}