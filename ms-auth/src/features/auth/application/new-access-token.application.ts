import { Auth } from "../domain/auth";
import { AuthRepository } from "../domain/auth.repository";
import { Tokens } from "../domain/tokens.interface";
import { AuthService } from "./services/auth.service";

export class NewAccessTokenApplication {
  readonly repository: AuthRepository;

  constructor(repository: AuthRepository) {
    this.repository = repository;
  }

  async newAccessToken(refreshToken: string): Promise<Tokens | null> {
    const auth: Auth | null = await this.repository.findOne({refreshToken});

    if (!auth) {
      return null;
    }

    const accessToken = AuthService.generateAccessToken(auth._id!, auth.name, auth.email);
    const newRefreshToken = AuthService.generateRefreshToken();
    await this.repository.update({refreshToken}, {refreshToken: newRefreshToken})

    return { accessToken, refreshToken: newRefreshToken };
  }
}