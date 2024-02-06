import { Test, TestingModule } from '@nestjs/testing';
//import { NotFoundException } from '@nestjs/common';
import { UsersService } from './users.service';
import { userRepositoryMock } from '../testing/users/user-repository.mock';
import { listAllUsersMock } from '../testing/users/list-all-users.mock';
import { createUserDtoMock } from '../testing/users/create-user-dto.mock';
import { responseCreateUserMock } from '../testing/users/response-create-user.mock';
import { updateUserDtoMock } from '../testing/users/update-user-dto.mock';
import { findByIdUserMock } from '../testing/users/find-by-id-user.mock';
import { HttpException } from '@nestjs/common';
//import { NotFoundException } from '@nestjs/common';

describe('UsersService', () => {
  let userService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService, userRepositoryMock],
    }).compile();

    userService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
  });

  describe('Create User', () => {
    it('Should creat and return user saved in the database', async () => {
      const result = await userService.create(createUserDtoMock);
      expect(result).toEqual(responseCreateUserMock);
    });
  });

  describe('Get all users', () => {
    it('Should return a list of users', async () => {
      const result = await userService.findAll();
      expect(result).toEqual(listAllUsersMock);
    });
  });

  describe('Find User by Id', () => {
    it('Should return an user', async () => {
      const result = await userService.findOne(1);
      expect(result).toEqual(findByIdUserMock);
    });
  });

  describe('Not find User by Id', () => {
    it('Should return an error stating that the user was not found', async () => {
      jest
        .spyOn(userRepositoryMock.useValue, 'findOne')
        .mockRejectedValueOnce(
          new HttpException('User with id:1 not found.', 400),
        );

      await expect(userService.findOne(1)).rejects.toThrow(HttpException);
    });
  });
});
