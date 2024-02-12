import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { authServiceMock } from '../testing/auth/auth-service.mock';
import { tokenMock } from '../testing/auth/token.mock';
import { userLoginCredentialsMock } from '../testing/auth/user-login-credentials.mock';
import { userRepositoryMock } from '../testing/users/user-repository.mock';
import { HttpException } from '@nestjs/common';

describe('AuthController', () => {
  let authController: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [authServiceMock, userRepositoryMock],
    }).compile();

    authController = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(authController).toBeDefined();
  });

  describe('Login user', () => {
    it('Should return token to user', async () => {
      const result = await authController.login(userLoginCredentialsMock);

      expect(result).toEqual(tokenMock);
    });
  });

  // describe('Login user - user not exists', () => {
  //   it('Should return error', async () => {
  //     jest
  //       .spyOn(userRepositoryMock.useValue, 'findOne')
  //       .mockRejectedValueOnce(
  //         new HttpException('Email or password wrong.', 401),
  //       );
  //     const result = await authController.login(userLoginCredentialsMock);
  //     expect(result).rejects.toThrow(HttpException);
  //   });
  // });
});
