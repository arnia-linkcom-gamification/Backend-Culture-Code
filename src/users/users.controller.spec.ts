import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
//import { UsersService } from './users.service';
import { AuthGuard } from '../auth/guards/auth-guard';
import { authGuardMock } from '../testing/auth/auth-guard.mock';
import { usersServiceMock } from '../testing/users/users-service.mock';
import { createUserDtoMock } from '../testing/users/create-user-dto.mock';
import { userMock } from '../testing/users/user.mock';
import { listAllUsersMock } from '../testing/users/list-all-users.mock';
import { updateUserMock } from '../testing/users/update-user-dto.mock';
import { updatedUserMock } from '../testing/users/updated-user.mock';
import { UpdateUserDto } from './dto/update-user.dto';
import { imageMock } from '../testing/image/image.mock';

describe('UsersController', () => {
  let userController: UsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [usersServiceMock],
    })
      .overrideGuard(AuthGuard)
      .useValue(authGuardMock)
      .compile();

    userController = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(userController).toBeDefined();
  });

  describe('Create user', () => {
    it('Should create an user', async () => {
      const image = await imageMock();
      const result = await userController.create(createUserDtoMock, image);

      expect(result).toEqual(userMock);
    });
  });

  describe('Find all users', () => {
    it('Should create an user', async () => {
      const result = await userController.findAll();

      expect(result).toEqual(listAllUsersMock);
    });
  });

  describe('Find user by Id', () => {
    it('Should find all user', async () => {
      const result = await userController.findOne(1);

      expect(result).toEqual(userMock);
    });
  });

  describe('Get informations about user', () => {
    it('Should find all user', async () => {
      const result = await userController.me(1);

      expect(result).toEqual(userMock);
    });
  });

  describe('Update User', () => {
    it('Should return product updated.', async () => {
      const result = await userController.update(
        1,
        updateUserMock as UpdateUserDto,
      );

      expect(result).toEqual(updatedUserMock);
    });

    it('Should return product updated, when user get update', async () => {
      const result = await userController.updateMe(
        1,
        updateUserMock as UpdateUserDto,
      );

      expect(result).toEqual(updatedUserMock);
    });
  });

  describe('SoftDelete user', () => {
    it('Should inactivate user and return status 204', async () => {
      const result = await userController.remove(1);

      expect(result).toBeUndefined();
    });

    it('Should inactivate user and return status 204,when user get remove himself', async () => {
      const result = await userController.deleteMe(1);

      expect(result).toBeUndefined();
    });
  });

  describe('Restore user', () => {
    it('Should restore user', async () => {
      const result = await userController.restore(1);

      expect(result).toBeUndefined();
    });
  });
});
