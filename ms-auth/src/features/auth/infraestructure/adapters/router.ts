import express from 'express';
import { ErrorMiddleware } from '../../../../middlewares/error.middleware';
import { LoginController, NewAccessTokenController, RegisterController, ValidateAccessTokenController } from './controllers';
import { AuthInfraestructure } from '../mongo-database/auth.infraestructure';
import { RegisterApplication } from '../../application/register.application';
import { LoginApplication } from '../../application/login.application';
import { ValidateAccessTokenApplication } from '../../application/validate-access-token.application';
import { NewAccessTokenApplication } from '../../application/new-access-token.application';

const authInfraestructure = new AuthInfraestructure();
const registerApplication = new RegisterApplication(authInfraestructure);
const registerController = new RegisterController(registerApplication);
const loginApplication = new LoginApplication(authInfraestructure);
const loginController = new LoginController(loginApplication);
const validateAccessTokenController = new ValidateAccessTokenController();
const newAccessTokenApplication = new NewAccessTokenApplication(authInfraestructure);
const newAccessTokenController = new NewAccessTokenController(newAccessTokenApplication);

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