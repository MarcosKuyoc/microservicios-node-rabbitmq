import { AuthRepository } from "../domain/auth.repository";
import { AuthPayload } from "./services/auth-payload.interface";
import { AuthService } from "./services/auth.service";

export class ValidateAccessTokenApplication {
  async validateAccessToken(accessToken: string): Promise<AuthPayload> {
    return await AuthService.validateAccessToken(accessToken);
  }
}