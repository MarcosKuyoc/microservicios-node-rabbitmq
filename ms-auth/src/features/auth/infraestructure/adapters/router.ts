import express from 'express';
import { ErrorMiddleware } from '../../../../middlewares/error.middleware';
import { LoginController, NewAccessTokenController, RegisterController, ValidateAccessTokenController } from './controllers';

const registerController = new RegisterController();
const loginController = new LoginController();
const validateAccessTokenController = new ValidateAccessTokenController();
const newAccessTokenController = new NewAccessTokenController();

class Router {
  readonly router: express.Router;

  constructor() {
    this.router = express.Router();
    this.mountRouter();
  }

  private mountRouter() {
    this.router.post('/register', ErrorMiddleware.catchError(registerController.register));
    this.router.post('/login', ErrorMiddleware.catchError(loginController.login));
    this.router.post('/validate-access-token', ErrorMiddleware.catchError(validateAccessTokenController.validateAccessToken));
    this.router.post('/new-access-token', ErrorMiddleware.catchError(newAccessTokenController.newAccessToken));
  }
}

export default new Router().router;