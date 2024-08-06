import yenv from 'yenv';
const env = yenv();

export class EnvironmentVariables {
    static get PORT(): number {
        return process.env.PORT || env.PORT || 3000;
    }

    static get BASE_API_URL(): string {
        return '/auth';
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

    static get TOKEN_TIMEOUT(): number {
        return process.env.TOKEN_TIMEOUT || env.TOKEN.TIMEOUT || 15;
    }

    static get TOKEN_SECRET_WORD(): string {
        return process.env.TOKEN_SECRET_WORD || env.TOKEN.SECRET_WORD || "APP_M3XIC0_12345";
    }
}