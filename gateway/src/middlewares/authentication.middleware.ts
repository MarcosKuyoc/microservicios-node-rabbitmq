import { Request, Response, NextFunction } from 'express'; 
import { jwtDecode } from 'jwt-decode';
import { Route, routes } from '../routes';
import { excuteRequest } from '../http/httpClient';
import { IError } from './error.interface';

export const auth = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    if (!existsHeaderAuthorization(req) || !isFormatHeaderAuthorization(req)) {
      res.status(401).json({ message: "No tiene autorización para acceder al recurso." });
      return;
    }

    if (!await isAccessTokenValid(req)) {
      res.status(401).json({ message: "El token es inválido" });
      return;
    }

    setUserId(req, res);
    next();
  } catch (error: any) {
    const err: Partial<IError> = new Error("Authentication error");
    err.message = error.message;
    err.stack = error.stack;
    err.status = 409;

    next(err);
  }
};

const existsHeaderAuthorization = (req: Request): boolean => {
  return !!req.headers.authorization?.split(" ") ? true : false;
};

const isFormatHeaderAuthorization = (req: Request): boolean => {
  const parts = req.headers.authorization?.split(" ");
  return parts?.length === 2 && parts[0] === 'Bearer';
};

const getAccessToken = (req: Request): string => {
  return req.headers.authorization?.split(" ")[1] as string;
};

const isAccessTokenValid = async (req: Request): Promise<boolean> => {
  const accessToken = getAccessToken(req);
  const routevalidateAccessToken: Route | undefined = routes.find(route => route.origin === '/api/validate-access-token');

  if (routevalidateAccessToken) {
    const result = await excuteRequest(routevalidateAccessToken, { accessToken });
    return result.valid;
  }
  return false;
};

const setUserId = (req: Request, res: Response): void => {
  const accessToken = getAccessToken(req);
  const payload: { id?: string } = jwtDecode(accessToken);
  if (payload.id) {
    res.locals.userId = payload.id;
  }
};
