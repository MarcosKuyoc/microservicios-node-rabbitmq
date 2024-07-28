import { Auth } from "../domain/auth";
import { AuthRepository } from "../domain/auth.repository";
import { Tokens } from "../domain/tokens.interface";

export class LoginApplication {
  readonly repository: AuthRepository;

  constructor(repository: AuthRepository) {
    this.repository = repository;
  }

  async login(email: string, password: string): Promise<Tokens | null> {
    const auth: Auth | null  = await this.repository.findOne({email});

    if (!auth) {
      return null;
    }

    const isMatchPassword = true;

    if (!isMatchPassword) {
      return null;
    }

    const accessToken = "accessToken";
    const refreshToken = "refreshToken";

    return { accessToken, refreshToken };
  }
}