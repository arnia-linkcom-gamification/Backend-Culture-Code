import { Test, TestingModule } from '@nestjs/testing';
import { JewelsService } from './jewels.service';
import { jewelRepositoryMock } from '../testing/jewels/jewel-repository.mock';
import { usersJewelsRepositoryMock } from '../testing/jewels/users-jewels-repository.mock';
import { usersServiceMock } from '../testing/users/users-service.mock';
import { userRepositoryMock } from '../testing/users/user-repository.mock';
import { UsersService } from '../users/users.service';
import { listAllJewelsMock } from '../testing/jewels/list-all-jewels.mock';
import { HttpException } from '@nestjs/common';
import { CreateJewelMock } from '../testing/jewels/create-jewel.mock';
import { CreateJewelDto } from './dto/create-jewel.dto';
import { updateJewelDtoMock } from '../testing/jewels/update-jewel-dto.mock';
import { UpdateJewelDto } from './dto/update-jewel.dto';
import { updatedJewelMock } from '../testing/jewels/updated-jewel.mock';

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

  describe('Create jewels', () => {
    it('Should return a list of users', async () => {
      const result = await jewelService.create(
        CreateJewelMock as unknown as CreateJewelDto,
      );
      expect(result).toEqual(listAllJewelsMock[0]);
    });
  });

  describe('Error to create jewels', () => {
    it('Should return an error stating that the jewel already exists', async () => {
      jest
        .spyOn(jewelRepositoryMock.useValue, 'exists')
        .mockResolvedValueOnce(true);
      await expect(
        jewelService.create(CreateJewelMock as unknown as CreateJewelDto),
      ).rejects.toThrow(HttpException);
    });
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

  describe('Update jewel', () => {
    it('Should return updated user data', async () => {
      const result = await jewelService.update(
        1,
        updateJewelDtoMock as UpdateJewelDto,
      );
      console.log(89, result);
      console.log(90, updatedJewelMock)
      expect(result).toEqual(updatedJewelMock);
    });
  });
});
