import {Request, Response} from 'express';
import { ValidateAccessTokenApplication } from '../../../application/validate-access-token.application';
import { ErrorAuthPayload } from '../../../application/services/auth-payload.interface';
import { AuthService } from '../../../application/services/auth.service';

export class ValidateAccessTokenController {
  async validateAccessToken(req: Request, res: Response) {
    try {
      const { accessToken } = req.body;
      await AuthService.validateAccessToken(accessToken);
  
      return res.json({valid: true});
    } catch (error: any) {
      return res.status(error.status).send(error.message);
    }
  }
}