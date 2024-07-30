import mongoose from "mongoose";
import { Bootstrap } from "./bootstrap";
import { EnvironmentVariables } from "../config/app.config";

export class DatabaseBootstrap extends Bootstrap {
    public initialize(): Promise<boolean | Error> {
        return new Promise<boolean | Error>((resolve, reject) => {
            const username:string = EnvironmentVariables.MONGO_USERNAME;
            const password:string = EnvironmentVariables.MONGO_PASSWORD;
            const host:string = EnvironmentVariables.MONGO_HOST;
            const port:number = EnvironmentVariables.MONGO_PORT
            const database: string = EnvironmentVariables.MONGO_DATABASE_NAME;
            const authSource:string = EnvironmentVariables.MONGO_DATABASE_SOURCE;

            const connectionString = `mongodb://${username}:${password}@${host}:${port}/${database}?authSource=${authSource}&retryWrites=true&w=majority`;
            const options = {
                minPoolSize: 5,
                maxPoolSize: 10,
            };

            mongoose.connect(connectionString, options)
            .then(
                () => { 
                    resolve(true);
                    console.log("Database mongo is running");
                },
                err => {
                    reject(err);
                    console.error(err);
                }
            );
        });
    }
}