import { EnvironmentVariables } from "../config/app.config";
import amqp from "amqplib";
import { Bootstrap } from "./bootstrap";

let channel: amqp.Channel;

export class BrokerBootstrap extends Bootstrap {
  public initialize(): Promise<boolean | Error> {
    return new Promise(async (resolve, reject) => {
      const HOST = EnvironmentVariables.RABBITMQ_HOST;

      try {
        const connection = await amqp.connect(`amqp://${HOST}`);
        channel = await connection.createChannel();
        resolve(true);
        console.log("Connected to RabbitMQ");
      } catch (error) {
        reject(error);
        console.error("RabbitMQ error connected");
      }
    });
  }

  static get Channel(): amqp.Channel {
    return channel;
  }
}