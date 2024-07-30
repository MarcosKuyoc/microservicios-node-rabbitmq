export enum STATUS {
  PENDING = "PENDING",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED"
}

export enum PAYMENT_GATEWAY {
  STRIPE = "STRIPE",
  PAYPAL = "PAYPAL",
}

export class Payment {
  readonly userId: string;
  readonly productId: string;
  readonly productName: string;
  readonly productCount: number;
  readonly transactionId: string;
  readonly status: STATUS;
  readonly gateway: PAYMENT_GATEWAY;

  constructor(
    userId: string,
    productId: string,
    productName: string,
    productCount: number,
    transactionId: string,
    status: STATUS,
    gateway: PAYMENT_GATEWAY
  ) {
    this.userId = userId;
    this.productId = productId;
    this.productName = productName;
    this.productCount = productCount;
    this.transactionId = transactionId;
    this.status = status;
    this.gateway = gateway
  }
}