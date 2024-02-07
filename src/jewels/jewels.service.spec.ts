import { Test, TestingModule } from '@nestjs/testing';
import { JewelsService } from './jewels.service';
import { jewelRepositoryMock } from '../testing/jewels/jewel-repository.mock';
import { usersJewelsRepositoryMock } from '../testing/jewels/users-jewels-repository.mock';
import { usersServiceMock } from '../testing/users/users-service.mock';
import { userRepositoryMock } from '../testing/users/user-repository.mock';
import { UsersService } from '../users/users.service';
import { listAllJewelsMock } from '../testing/jewels/list-all-jewels.mock';

describe('JewelsService', () => {
  let jewelService: JewelsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        JewelsService,
        UsersService,
        jewelRepositoryMock,
        userRepositoryMock,
        usersJewelsRepositoryMock,
        usersServiceMock,
      ],
    }).compile();

    jewelService = module.get<JewelsService>(JewelsService);
  });

  it('should be defined', () => {
    expect(jewelService).toBeDefined();
  });

  describe('Get all jewels', () => {
    it('Should return a list of users', async () => {
      const result = await jewelService.findAll();
      expect(result).toEqual(listAllJewelsMock);
    });
  });
});
