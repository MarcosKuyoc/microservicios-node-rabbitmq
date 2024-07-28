import { AuthRepository } from "../domain/auth.repository";

export class ValidateAccessTokenApplication {
  readonly repository: AuthRepository;

  constructor(repository: AuthRepository) {
    this.repository = repository;
  }

  async validateAccessToken(): Promise<string> {
    return "payloadJWTDecode";
  }
}