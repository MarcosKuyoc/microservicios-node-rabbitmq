export type STATUS_TYPE = "PENDING" | "COMPLETED" | "CANCELLED";
export enum STATUS {
  PENDING = "PENDING",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED"
}

export class Order {
  readonly userId: string;
  readonly productId: string;
  readonly productName: string;
  readonly productCount: number;
  readonly transactionId: string;
  readonly status: STATUS_TYPE;

  constructor(
    userId: string,
    productId: string,
    productName: string,
    productCount: number,
    transactionId: string,
    status: STATUS
  ) {
    this.userId = userId;
    this.productId = productId;
    this.productName = productName;
    this.productCount = productCount;
    this.transactionId = transactionId;
    this.status = status;
  }
}