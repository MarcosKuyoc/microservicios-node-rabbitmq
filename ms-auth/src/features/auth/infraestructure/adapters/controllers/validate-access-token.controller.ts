import {Request, Response} from 'express';

export class ValidateAccessTokenController {
  async validateAccessToken(req: Request, res: Response) {
    res.json('validate access token');
  }
}