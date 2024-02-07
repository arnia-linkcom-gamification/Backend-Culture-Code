import { Test, TestingModule } from '@nestjs/testing';
import { JewelsService } from './jewels.service';
import { jewelRepositoryMock } from '../testing/jewels/jewel-repository.mock';
import { usersJewelsRepositoryMock } from '../testing/jewels/users-jewels-repository.mock';
import { usersServiceMock } from '../testing/users/users-service.mock';
import { userRepositoryMock } from '../testing/users/user-repository.mock';
import { UsersService } from '../users/users.service';
import { listAllJewelsMock } from '../testing/jewels/list-all-jewels.mock';
import { HttpException } from '@nestjs/common';

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

  describe('Find Jewel by Id', () => {
    it('Should return a jewel', async () => {
      const result = await jewelService.findOne(1);
      expect(result).toEqual(listAllJewelsMock[0]);
    });
  });

  describe('Not find Jewel by Id', () => {
    it('Should return an error stating that the jewel was not found', async () => {
      jest
        .spyOn(jewelRepositoryMock.useValue, 'findOne')
        .mockRejectedValueOnce(
          new HttpException('Jewel with id:1 not found.', 404),
        );
      await expect(jewelService.findOne(1)).rejects.toThrow(HttpException);
    });
  });
});
