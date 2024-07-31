import express, { Application, Request, Response } from 'express';
import { ErrorMiddleware } from './middlewares/error.middleware';
import { Route, routes } from './routes';
import { excuteRequest } from './http/httpClient';

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
        this.expressApp.get("/", (req: Request, res: Response) => {
            res.status(200).json("App is running");
        });

        routes.forEach((route: Route)=> {
            this.expressApp.post(route.origin, ...route.middlewares,
                ErrorMiddleware.catchError(async(req: Request, res: Response) => {
                    let userId;
                    let data = {...req.body};
                    
                    if (res.locals.userId) {
                        userId = res.locals.userId;
                        data = {...req.body, userId};
                    }
                    const result = await excuteRequest(route, data);
                    console.debug("response: ", result);
                    res.json(result);
                })
            );
        })
    }

    private mountErrors() {
        this.expressApp.use(ErrorMiddleware.notFound);
        this.expressApp.use(ErrorMiddleware.generic);
    }
}

export default new App().expressApp;