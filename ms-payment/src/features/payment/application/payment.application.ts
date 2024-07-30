import { STATUS } from "../domain/payment";
import { PaymentRepository } from "../domain/payment.repository";

export class PaymentApplication {
  readonly repositoryPayment: PaymentRepository;

  constructor(
    repositoryPayment: PaymentRepository,
  ) {
    this.repositoryPayment = repositoryPayment;
  }

  async update(transactionId: string, status: STATUS): Promise<string> {
    return this.repositoryPayment.update(transactionId, status);
  }
}