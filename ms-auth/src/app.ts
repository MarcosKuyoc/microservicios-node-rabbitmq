import express, { Application, Request, Response } from 'express';
import { ErrorMiddleware } from './middlewares/error.middleware';
import router from './features/auth/infraestructure/adapters/router';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger/swagger.json';


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
        if (process.env.NODE_ENV === 'development') {
            this.expressApp.use('/api-docs',
                swaggerUi.serve,
                swaggerUi.setup(swaggerDocument)
            );
        }
        this.expressApp.use('/auth', router)
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