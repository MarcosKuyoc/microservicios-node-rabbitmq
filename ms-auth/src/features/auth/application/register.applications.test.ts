import { Auth } from "../domain/auth";
import { RegisterApplication } from "./register.application";

describe('register user in application', ()=> {
  const name = 'Jane Doe';
  const email = 'jane@example.com';
  const password = 'password123';

  it('should return access and refresh tokens when registering a new user with valid details', async () => {
    // Arrange
    const expectedRefreshToken = 'refreshToken';
    const cipherPassword = `cipher${password}`;
    const auth = new Auth(name, email, cipherPassword, expectedRefreshToken);

    const authRepository = {
      register: jest.fn().mockResolvedValue('some-id'),
      findOne: jest.fn(),
      update: jest.fn()
    };

    // Act
    const registerApp = new RegisterApplication(authRepository);
    const tokens = await registerApp.register(name, email, password);

    // Assert
    const jwtParts = tokens.accessToken.split('.');
    expect(typeof tokens.accessToken).toBe('string');
    expect(typeof tokens.refreshToken).toBe('string');
    expect(jwtParts.length).toBe(3);
    expect(authRepository.register).toHaveBeenCalledTimes(1);
  });

  it('should throw an error when registering with an already existing email', async () => {
    // Arrange
    const authRepository = {
      register: jest.fn().mockRejectedValue(new Error('Email already exists')),
      findOne: jest.fn(),
      update: jest.fn(),
    };

    // Act
    const registerApp = new RegisterApplication(authRepository);

    // Assert
    try {
      await registerApp.register(name, email, password);
    } catch (error) {
      if (error instanceof Error) {
        console.error('Actual error message:', error.message);
        expect(error.message).toBe('Email already exists');
      } else {
        throw error;
      }
    }
  });
})