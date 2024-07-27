import {Request, Response} from 'express';

export class RegisterController {
  async register(req: Request, res: Response) {
    res.json('register');
  }
}