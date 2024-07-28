import { Auth } from "../domain/auth";
import { AuthRepository } from "../domain/auth.repository";
import { Tokens } from "../domain/tokens.interface";

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

    const accessToken = "accessToken";
    const newRefreshToken = "refreshToken";
    await this.repository.update({refreshToken}, {refreshToken: newRefreshToken})

    return { accessToken, refreshToken: newRefreshToken };
  }
}