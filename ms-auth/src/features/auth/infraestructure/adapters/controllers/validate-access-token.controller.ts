import { Request, Response } from 'express';
import { AuthService } from '../../../application/services/auth.service';

export class ValidateAccessTokenController {
  async validateAccessToken(req: Request, res: Response) {
    try {
      const { accessToken } = req.body;
      await AuthService.validateAccessToken(accessToken);
  
      return res.status(200).json({valid: true});
    } catch (error: any) {
      throw error;
    }
  }
}