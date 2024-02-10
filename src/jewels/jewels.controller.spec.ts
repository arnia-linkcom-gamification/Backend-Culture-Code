import { Test, TestingModule } from '@nestjs/testing';
import { JewelsController } from './jewels.controller';
import { jewelsServiceMock } from '../testing/jewels/jewels-service.mock';
import { AuthGuard } from '../auth/guards/auth-guard';
import { authGuardMock } from '../testing/auth/auth-guard.mock';
import { listAllJewelsMock } from '../testing/jewels/list-all-jewels.mock';
import { updateJewelDtoMock } from '../testing/jewels/update-jewel-dto.mock';
import { UpdateJewelDto } from './dto/update-jewel.dto';
import { updatedJewelMock } from '../testing/jewels/updated-jewel.mock';

describe('JewelsController', () => {
  let jewelController: JewelsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [JewelsController],
      providers: [jewelsServiceMock],
    })
      .overrideGuard(AuthGuard)
      .useValue(authGuardMock)
      .compile();

    jewelController = module.get<JewelsController>(JewelsController);
  });

  it('should be defined', () => {
    expect(jewelController).toBeDefined();
  });

  describe('Find All', () => {
    it('Should return the list all jewels', async () => {
      const result = await jewelController.findAll();

      expect(result).toEqual(listAllJewelsMock);
    });
  });

  describe('Find jewel by Id', () => {
    it('Should return the jewel', async () => {
      const result = await jewelController.findOne(1);

      expect(result).toEqual(listAllJewelsMock[0]);
    });
  });

  describe('Update jewel', () => {
    it('Should return the jewel updated', async () => {
      const result = await jewelController.update(
        1,
        updateJewelDtoMock as UpdateJewelDto,
      );

      expect(result).toEqual(updatedJewelMock);
    });
  });
});
