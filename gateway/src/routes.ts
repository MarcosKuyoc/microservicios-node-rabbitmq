import { Request, Response, NextFunction } from 'express';
import { EnvironmentVariables } from './config/app.config';
import { auth } from './middlewares/authentication.middleware';

type Middleware = (req: Request, res: Response, next: NextFunction) => Promise<any>;

export enum METHODS {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE"
};

export interface Route {
  origin: string;
  target: string;
  method: METHODS;
  middlewares: Middleware[]
}

export const routes: Route[] = [
  {
    origin: "/api/register",
    target: `${EnvironmentVariables.PATH_AUTH}/auth/register`,
    method: METHODS.POST,
    middlewares: []
  },
  {
    origin: "/api/login",
    target: `${EnvironmentVariables.PATH_AUTH}/auth/login`,
    method: METHODS.POST,
    middlewares: []
  },
  {
    origin: "/api/validate-access-token",
    target: `${EnvironmentVariables.PATH_AUTH}/auth/validate-access-token`,
    method: METHODS.POST,
    middlewares: []
  },
  {
    origin: "/api/new-access-token",
    target: `${EnvironmentVariables.PATH_AUTH}/auth/new-access-token`,
    method: METHODS.POST,
    middlewares: []
  },
  {
    origin: "/api/order",
    target: `${EnvironmentVariables.PATH_ORDER}/order`,
    method: METHODS.POST,
    middlewares: [auth]
  }
];