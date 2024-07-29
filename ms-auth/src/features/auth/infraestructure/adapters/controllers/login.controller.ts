import {Request, Response} from 'express';
import { LoginApplication } from '../../../application/login.application';
import { Tokens } from '../../../domain/tokens.interface';

export class LoginController {
  readonly application: LoginApplication;

  constructor(application:LoginApplication) {
    this.application = application;
    this.login = this.login.bind(this);
  }

  async login(req: Request, res: Response) {
    const { email, password } = req.body;
    const result: Tokens | null = await this.application.login(email, password);

    if (result) {
      return res.status(200).json(result);
    }

    return res.status(404).json('Not found user.');
  }
}