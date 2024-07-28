export class Auth {
  _id?: string;
  readonly name: string;
  readonly email: string;
  readonly password: string;
  readonly refreshToken: string;

  constructor(name: string, email: string, password: string, refreshToken: string) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.refreshToken = refreshToken;
  }
}