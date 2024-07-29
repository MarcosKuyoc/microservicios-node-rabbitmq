import { Auth } from "../domain/auth";
import { AuthRepository } from "../domain/auth.repository";
import { Tokens } from "../domain/tokens.interface";
import { AuthService } from "./services/auth.service";

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

    const isMatchPassword = await AuthService.isMatchPassword(password, auth.password);

    if (!isMatchPassword) {
      return null;
    }

    const accessToken = AuthService.generateAccessToken(auth._id!, auth.name, auth.email);
    const refreshToken = auth.refreshToken;

    return { accessToken, refreshToken };
  }
}