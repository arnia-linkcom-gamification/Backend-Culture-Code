import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import * as bcrypt from 'bcrypt';
import { userRepositoryMock } from '../testing/users/user-repository.mock';
import { usersServiceMock } from '../testing/users/users-service.mock';
import { jwtServiceMock } from '../testing/auth/jwt-service.mock';
import { tokenMock } from '../testing/auth/token.mock';
import { userLoginCredentialsMock } from '../testing/auth/user-login-credentials.mock';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        jwtServiceMock,
        usersServiceMock,
        userRepositoryMock,
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('login', () => {
    it('Should return a token', async () => {
      jest.spyOn(bcrypt, 'compare').mockResolvedValue(true as never);

      const result = await service.login(userLoginCredentialsMock);

      expect(result).toEqual(tokenMock);
    });
  });
});
