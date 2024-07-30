import { BrokerApplication } from "../../application/broker.application";


export default class BrokerController {
  constructor(private brokerApplication: BrokerApplication) {}

  async listen() {
    await this.brokerApplication.receive();
    console.log("Broker listening");
  }
}