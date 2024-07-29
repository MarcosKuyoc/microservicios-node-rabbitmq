import express from 'express';
import { AuthInfraestructure } from '../mongo-database/auth.infraestructure';
import { LoginController, NewAccessTokenController, RegisterController, ValidateAccessTokenController } from './controllers';
import { LoginApplication, NewAccessTokenApplication, RegisterApplication } from '../../application';
import { ErrorMiddleware, ValidatorMiddleware } from '../../../../middlewares';
import { AuthSchema } from './schemas/auth.schema';

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
    this.router.post('/register',
      ValidatorMiddleware.validate(AuthSchema.REGISTER),
      ErrorMiddleware.catchError(registerController.register)
    );
    this.router.post('/login',
      ValidatorMiddleware.validate(AuthSchema.LOGIN),
      ErrorMiddleware.catchError(loginController.login)
    );
    this.router.post('/validate-access-token',
      ValidatorMiddleware.validate(AuthSchema.VALIDATE_JWT),
      ErrorMiddleware.catchError(validateAccessTokenController.validateAccessToken)
    );
    this.router.post('/new-access-token',
      ValidatorMiddleware.validate(AuthSchema.NEW_ACCESS_TOKEN),
      ErrorMiddleware.catchError(newAccessTokenController.newAccessToken)
    );
  }
}

export default new Router().router;