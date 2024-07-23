import { EnvironmentVariables } from "../config/app.config";
import { Bootstrap } from "./bootstrap";
import http from "http";

export class ServerBootstrap extends Bootstrap {
    public initilize(): Promise<boolean | Error> {
        return new Promise<boolean | Error>((resolve, reject) => {
            const server =  http.createServer();
            const PORT = EnvironmentVariables.PORT;
    
            server
            .listen(PORT)
            .on("listening", () => {
                resolve(true);
                console.log(`Server is running on Port ${PORT}`);
            })
            .on("error", (err : Error) => {
                reject(err);
                console.error(err);
            })
        })
    }
}