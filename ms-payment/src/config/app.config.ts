import yenv from 'yenv';
const env = yenv();

export class EnvironmentVariables {
    static get PORT(): number {
        return process.env.PORT || env.PORT || 3200;
    }

    static get MONGO_HOST(): string {
        return process.env.MONGO_HOST || env.DATABASE.MONGO.HOST || "127.0.0.1";
    }

    static get MONGO_DATABASE_NAME(): string {
        return process.env.MONGO_DATABASE_NAME || env.DATABASE.MONGO.NAME || "auth";
    }

    static get MONGO_DATABASE_SOURCE(): string {
        return process.env.MONGO_DATABASE_SOURCE || env.DATABASE.MONGO.SOURCE || "admin";
    }

    static get MONGO_PORT(): number {
        return process.env.MONGO_PORT || env.DATABASE.MONGO.PORT || 27017;
    }

    static get MONGO_USERNAME(): string {
        return process.env.MONGO_USERNAME || env.DATABASE.MONGO.USERNAME || "root";
    }

    static get MONGO_PASSWORD(): string {
        return process.env.MONGO_PASSWORD || env.DATABASE.MONGO.PASSWORD || "12345";
    }

    static get RABBITMQ_HOST(): string {
        return process.env.RABBITMQ_HOST || env.RABBITMQ.HOST || "localhost:5672";
      }
    
    static get QUEUE_ORDER_CREATED_EVENT(): string {
        return (
            process.env.QUEUE_ORDER_CREATED_EVENT ||
            env.RABBITMQ.QUEUES.ORDER_CREATED_EVENT ||
            "ORDER_CREATED_EVENT"
        );
    }
    
    static get QUEUE_ORDER_PAID_EVENT(): string {
        return (
            process.env.QUEUE_ORDER_PAID_EVENT || env.RABBITMQ.QUEUES.ORDER_PAID_EVENT
        );
    }
    
    static get EXCHANGE_ERROR_EVENT(): string {
        return (
            process.env.EXCHANGE_ERROR_EVENT ||
            env.RABBITMQ.EXCHANGES.EXCHANGE_ERROR_EVENT
        );
    }
}