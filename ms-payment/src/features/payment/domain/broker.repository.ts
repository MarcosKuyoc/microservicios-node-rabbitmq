export interface BrokerRepository {
  send(message: any): Promise<any>;
  receive(): Promise<any>;
  sendError(message: any): Promise<any>;
}