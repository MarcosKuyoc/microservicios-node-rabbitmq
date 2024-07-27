import {Request, Response} from 'express';

export class LoginController {
  async login(req: Request, res: Response) {
    res.json('login');
  }
}