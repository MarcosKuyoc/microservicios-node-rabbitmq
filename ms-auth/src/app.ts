import express, { Application, Request, Response } from 'express';
import { ErrorMiddleware } from './middlewares/error.middleware';
import router from './features/auth/infraestructure/adapters/router';
import swaggerUi from 'swagger-ui-express';
import { setupSwagger } from './swagger';
import { EnvironmentVariables } from './config/app.config';

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
        this.expressApp.use(EnvironmentVariables.BASE_API_URL, router);

        if (process.env.NODE_ENV !== 'production') {
            setupSwagger(this.expressApp);
            this.expressApp.use('/api-docs', swaggerUi.serve, swaggerUi.setup(undefined, {
                swaggerOptions: {
                    url: '/api-docs.json'
                }
            }));
            console.log(`Documentacion de API http://localhost:${EnvironmentVariables.PORT}/api-docs`);
        }
        
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