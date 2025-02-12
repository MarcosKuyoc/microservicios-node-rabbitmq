import express from 'express';
import { orderSchema } from './order.schema';
import { NewOrderController } from './newOrder.controller';
import { OrderInfrastructure } from '../../mongo-database/order.infraestructure';
import { BrokerInfrastructure } from '../../rabbitmq/broker.infraestructure';
import { OrderApplication } from '../../../application/order.application';
import { ErrorMiddleware, ValidatorMiddleware } from '../../../../../middlewares';


const orderInfraestructure = new OrderInfrastructure();
const brokerInfraestructure = new BrokerInfrastructure(orderInfraestructure);
const orderApplication = new OrderApplication(orderInfraestructure, brokerInfraestructure);
const newOrderController = new NewOrderController(orderApplication);

class Router {
  readonly router: express.Router;

  constructor() {
    this.router = express.Router();
    this.mountRouter();
  }

  private mountRouter() {
    this.router.post('/',
      ValidatorMiddleware.validate(orderSchema.INSERT),
      ErrorMiddleware.catchError(newOrderController.newOrder)
    );
  }
}

export default new Router().router;