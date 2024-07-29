import {Request, Response} from 'express';
import { NewAccessTokenApplication } from '../../../application/new-access-token.application';
import { Tokens } from '../../../domain/tokens.interface';

export class NewAccessTokenController {
  readonly application: NewAccessTokenApplication;

  constructor(application: NewAccessTokenApplication) {
    this.application =  application;
    this.newAccessToken = this.newAccessToken.bind(this);
  }

  async newAccessToken(req: Request, res: Response) {
    const { refreshToken } = req.body;
    const result: Tokens | null = await this.application.newAccessToken(refreshToken);
    
    if (result) {
      return res.status(200).json(result);
    }

    return res.status(404).json('Not found user.');
  }
}