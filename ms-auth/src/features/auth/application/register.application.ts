import { Auth } from "../domain/auth";
import { AuthRepository } from "../domain/auth.repository";
import { Tokens } from "../domain/tokens.interface";
import { AuthService } from "./services/auth.service";

export class RegisterApplication {
  readonly repository: AuthRepository;

  constructor(repository: AuthRepository) {
    this.repository = repository;
  }

  async register(name: string, email: string, password: string): Promise<Tokens> {
    const refreshToken:string = AuthService.generateRefreshToken();
    const cipherPassword:string = await AuthService.cipherPassword(password);

    const auth:Auth = new Auth(name, email, cipherPassword, refreshToken);
    const id:string = await this.repository.register(auth);
    const accessToken = AuthService.generateAccessToken(id, name, email);

    return { accessToken, refreshToken };
  }
}