import { Application } from "express";
import { EnvironmentVariables } from "../config/app.config";
import { Bootstrap } from "./bootstrap";
import http from "http";

export class ServerBootstrap extends Bootstrap {
    constructor(private readonly app: Application) {
        super();
    }

    public initialize(): Promise<boolean | Error> {
        return new Promise<boolean | Error>((resolve, reject) => {
            const server =  http.createServer(this.app);
            const PORT = EnvironmentVariables.PORT;
    
            server
            .listen(PORT)
            .on("listening", () => {
                resolve(true);
                console.log(`Server is running on Port ${PORT}`);
                console.log(`http://localhost:${PORT}`);
            })
            .on("error", (err : Error) => {
                reject(err);
                console.error("Server error connected");
            })
        })
    }
}