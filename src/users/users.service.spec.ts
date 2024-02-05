import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { userRepositoryMock } from '../testing/users/user-repository.mock';
import { listAllUsersMock } from '../testing/users/list-all-users.mock';
import { createUserDtoMock } from '../testing/users/create-user-dto.mock';
import { responseCreateUserMock } from '../testing/users/response-create-user.mock';

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
});
