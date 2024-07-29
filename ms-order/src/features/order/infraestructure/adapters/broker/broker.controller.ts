import BrokerApplication from "../../../application/broker.application";

export class BrokerController {
  readonly brokerApllication: BrokerApplication; 
  constructor(brokerApllication: BrokerApplication) {
    this.brokerApllication = brokerApllication;
    this.listen = this.listen.bind(this);
  }

  async listen() {
    await this.brokerApllication.receive();
    console.log("Broker listening");
  }
}