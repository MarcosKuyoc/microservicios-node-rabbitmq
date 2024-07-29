import express, { Application, Request, Response } from 'express';
import { ErrorMiddleware } from './middlewares/error.middleware';
import router from './features/payment/infraestructure/adapters/router';

class App {
    readonly expressApp: Application;

    constructor() {
        this.expressApp = express();
        this.middlewares();
        this.mountRoutes();
        this.mountErrors();
    }

    private middlewares() {
        this.expressApp.use(express.json());
        this.expressApp.use(express.urlencoded({ extended : false}));
    }

    private mountRoutes() {
        this.expressApp.use('/payment', router)
        this.expressApp.get("/", (req: Request, res: Response) => {
            res.status(200).json("App is running");
        });
    }

    private mountErrors() {
        this.expressApp.use(ErrorMiddleware.notFound);
        this.expressApp.use(ErrorMiddleware.generic);
    }
}

export default new App().expressApp;