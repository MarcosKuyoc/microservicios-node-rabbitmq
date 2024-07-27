import {Request, Response} from 'express';

export class NewAccessTokenController {
  async newAccessToken(req: Request, res: Response) {
    res.json('nuevo access token');
  }
}