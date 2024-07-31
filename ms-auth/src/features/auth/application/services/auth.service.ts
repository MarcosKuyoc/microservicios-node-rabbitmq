import { v4 as uuidv4} from 'uuid';
import { EnvironmentVariables } from '../../../../config/app.config';
import { addMinute } from '@formkit/tempo';
import jwt from 'jwt-simple';
import bcrypt from "bcryptjs";
import { AuthPayload, ErrorAuthPayload } from './auth-payload.interface';

export class AuthService {
  static generateRefreshToken(): string {
    return uuidv4();
  }

  static generateAccessToken(id:string, name:string, email:string): string {
    // Obtener la hora actual en UNIX
    const iat = Math.floor(Date.now() / 1000);
    // Calcular la hora de expiración sumando el tiempo de expiración en minutos
    const exp = Math.floor(addMinute(new Date(), EnvironmentVariables.TOKEN_TIMEOUT).getTime() / 1000);

    const payload: AuthPayload = {
      id,
      name,
      email,
      iat,
      exp
    };

    return jwt.encode(payload,EnvironmentVariables.TOKEN_SECRET_WORD);
  }

  static async cipherPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }

  static async isMatchPassword(password: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(password, hash);
  }

  static async validateAccessToken(accessToken: string): Promise<AuthPayload | ErrorAuthPayload> {
    try {
      const payload = await jwt.decode(accessToken, EnvironmentVariables.TOKEN_SECRET_WORD);
      return payload;
    } catch (error: any) {
      if (error.message === 'Token expired') {
        throw new Error('the access token has expired');
      } else {
        throw new Error('the access token is invalid');
      }
    }
  }
}