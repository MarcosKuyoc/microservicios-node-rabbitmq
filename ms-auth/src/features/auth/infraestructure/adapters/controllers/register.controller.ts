import { RegisterApplication } from '../../../application/register.application';
import { Body, Post, Route, SuccessResponse, Response, Tags } from 'tsoa';
import { Tokens } from '../../../domain/tokens.interface';
import { Auth } from '../../../domain/auth';
import { ErrorAuthPayload } from '../../../application/services/auth-payload.interface';

type RequestAuth = Pick<Auth, 'name' | 'email' | "password">;

@Route('register')
@Tags('Register')
export class RegisterController {
  readonly application: RegisterApplication;

  constructor(application: RegisterApplication) {
    this.application = application;
    this.register = this.register.bind(this);
  }
 
  /**
   * Register a new user
   * @param requestBody User registration details
   */
  @Post()
  @SuccessResponse(201, 'User successfully registered')
  @Response<ErrorAuthPayload>(400, 'Invalid Paramaters')
  public async register(@Body() requestBody: RequestAuth): Promise<Tokens> {
    const { name, email, password } = requestBody;

    return await this.application.register(name, email, password);
  }
}