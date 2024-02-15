import { Test, TestingModule } from '@nestjs/testing';
import { HttpException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { userRepositoryMock } from '../testing/users/user-repository.mock';
import { listAllUsersMock } from '../testing/users/list-all-users.mock';
import { createUserDtoMock } from '../testing/users/create-user-dto.mock';
import { userMock } from '../testing/users/user.mock';
import { updateUserMock } from '../testing/users/update-user-dto.mock';
import { UpdateUserDto } from './dto/update-user.dto';
import { updatedUserMock } from '../testing/users/updated-user.mock';
import { imageMock } from '../testing/image/image.mock';

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
      const image = await imageMock();
      jest.spyOn(userService, 'upload').mockResolvedValueOnce('string');
      const result = await userService.create(createUserDtoMock, image);
      expect(result).toEqual(userMock);
    });

    it('Should return an error message', async () => {
      const image = await imageMock();
      jest
        .spyOn(userRepositoryMock.useValue, 'exists')
        .mockRejectedValueOnce(
          new HttpException('An user with this email already exists.', 409),
        );

      await expect(
        userService.create(createUserDtoMock, image),
      ).rejects.toThrow(HttpException);
    });
  });

  describe('Find all users', () => {
    it('Should return a list of users', async () => {
      const result = await userService.findAll();
      expect(result).toEqual(listAllUsersMock);
    });
  });

  describe('Find User by Id', () => {
    it('Should return the user', async () => {
      const result = await userService.findOne(1);
      expect(result).toEqual(listAllUsersMock[0]);
    });

    it('Should return an error stating that the user was not found', async () => {
      jest
        .spyOn(userRepositoryMock.useValue, 'findOne')
        .mockRejectedValueOnce(
          new HttpException('User with id:1 not found.', 400),
        );
      await expect(userService.findOne(1)).rejects.toThrow(HttpException);
    });
  });

  describe('Update User', () => {
    it('Should return updated user data', async () => {
      const result = await userService.update(
        1,
        updateUserMock as UpdateUserDto,
      );
      expect(result).toEqual(updatedUserMock);
    });

    it('Should return an error stating that the user was not found', async () => {
      jest
        .spyOn(userRepositoryMock.useValue, 'findOne')
        .mockRejectedValueOnce(
          new HttpException('User with id:1 not found.', 400),
        );
      await expect(
        userService.update(1, updateUserMock as UpdateUserDto),
      ).rejects.toThrow(HttpException);
    });
  });

  describe('SoftDelete User', () => {
    it('Should perform logical deletion of the user record', async () => {
      const result = await userService.softDelete(1);
      expect(result).toBeUndefined();
    });

    it('Should return an error stating that the user was not found', async () => {
      jest
        .spyOn(userRepositoryMock.useValue, 'findOne')
        .mockRejectedValueOnce(
          new HttpException('User with id:1 not found.', 404),
        );
      await expect(userService.softDelete(1)).rejects.toThrow(HttpException);
    });
  });

  describe('Restore User', () => {
    it('Should restore user', async () => {
      const result = await userService.restore(1);
      expect(result).toBeUndefined();
    });

    it('Should return an error stating that the user was not found', async () => {
      jest
        .spyOn(userRepositoryMock.useValue, 'findOne')
        .mockRejectedValueOnce(
          new HttpException('User with id:1 not found.', 404),
        );
      await expect(userService.restore(1)).rejects.toThrow(HttpException);
    });
  });
});
