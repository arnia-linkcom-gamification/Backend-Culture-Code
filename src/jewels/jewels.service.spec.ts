import { Test, TestingModule } from '@nestjs/testing';
import { JewelsService } from './jewels.service';
import { usersJewelsRepositoryMock } from '../testing/jewels/users-jewels-repository.mock';
import { usersServiceMock } from '../testing/users/users-service.mock';
import { userRepositoryMock } from '../testing/users/user-repository.mock';
import { HttpException } from '@nestjs/common';
import { CreateJewelDto } from './dto/create-jewel.dto';
import { UpdateJewelDto } from './dto/update-jewel.dto';
import { createJewelMock } from '../testing/jewels/create-jewel.mock';
import { listAllJewelsMock } from '../testing/jewels/list-all-jewels.mock';
import { updateJewelDtoMock } from '../testing/jewels/update-jewel-dto.mock';
import { updatedJewelMock } from '../testing/jewels/updated-jewel.mock';
import { jewelRepositoryMock } from '../testing/jewels/jewel-repository.mock';
import { updatedUserMock } from '../testing/users/updated-user.mock';
import { updateUserAssignJewelMock } from '../testing/jewels/update-user-assing-jewel.mock';
import { imageMock } from '../testing/image/image.mock';
import { mockedUploadImage } from '../testing/utils/upload.image.mock';

describe('JewelsService', () => {
  let jewelService: JewelsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        JewelsService,
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

  describe('Create jewel', () => {
    it('Should create a jewels', async () => {
      const jewelImage = await imageMock();

      jest
        .spyOn(await mockedUploadImage, 'uploadImage')
        .mockResolvedValue('mockedImageUrl');

      const result = await jewelService.create(
        createJewelMock as CreateJewelDto,
        jewelImage,
      );
      expect(result).toEqual(listAllJewelsMock[0]);
    });

    it('Should return an error message', async () => {
      const jewelImage = await imageMock();
      jest
        .spyOn(jewelRepositoryMock.useValue, 'exists')
        .mockRejectedValueOnce(
          new HttpException('This jewel already exists.', 409),
        );

      await expect(
        jewelService.create(createJewelMock as CreateJewelDto, jewelImage),
      ).rejects.toThrow(HttpException);
    });
  });

  describe('Get all jewels', () => {
    it('Should return a list of jewels', async () => {
      const result = await jewelService.findAll();
      expect(result).toEqual(listAllJewelsMock);
    });
  });

  describe('Find Jewel by Id', () => {
    it('Should return a jewel', async () => {
      const result = await jewelService.findOne(1);

      expect(result).toEqual(listAllJewelsMock[0]);
    });

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
    it('Should return updated jewel data', async () => {
      const jewelImage = await imageMock();

      jest
        .spyOn(await mockedUploadImage, 'uploadImage')
        .mockResolvedValue('mockedImageUrl');

      const result = await jewelService.update(
        1,
        updateJewelDtoMock as UpdateJewelDto,
        jewelImage,
      );
      expect(result).toEqual(updatedJewelMock);
    });

    it('Should return an error stating that the jewel was not found', async () => {
      jest
        .spyOn(jewelRepositoryMock.useValue, 'findOne')
        .mockRejectedValueOnce(
          new HttpException('Jewel with id:1 not found.', 400),
        );

      await expect(
        jewelService.update(1, updateJewelDtoMock as UpdateJewelDto),
      ).rejects.toThrow(HttpException);
    });
  });

  describe('Assign jewel', () => {
    it('Should return the user whith new jewel', async () => {
      jest
        .spyOn(userRepositoryMock.useValue, 'update')
        .mockResolvedValueOnce(updatedUserMock);

      const result = await jewelService.assign(1, 1);
      expect(result).toEqual(updateUserAssignJewelMock);
    });

    it('Should return an error stating that the jewel was not found.', async () => {
      jest
        .spyOn(jewelRepositoryMock.useValue, 'findOne')
        .mockRejectedValueOnce(
          new HttpException('Jewel with id:1 not found.', 404),
        );

      await expect(jewelService.assign(1, 1)).rejects.toThrow(HttpException);
    });
  });
});
