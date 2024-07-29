import {Request, Response} from 'express';
import { RegisterApplication } from '../../../application/register.application';

export class RegisterController {
  readonly application: RegisterApplication;

  constructor(application: RegisterApplication) {
    this.application = application;
    this.register = this.register.bind(this);
  }
  
  async register(req: Request, res: Response) {
    const { name, email, password } = req.body;

    const result = await this.application.register(name, email, password);
    res.status(201).json(result);
  }
}