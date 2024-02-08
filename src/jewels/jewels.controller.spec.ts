import { Test, TestingModule } from '@nestjs/testing';
import { JewelsController } from './jewels.controller';
import { jewelsServiceMock } from '../testing/jewels/jewels-service.mock';
import { AuthGuard } from '../auth/guards/auth-guard';
import { authGuardMock } from '../testing/auth/auth-guard.mock';

describe('JewelsController', () => {
  let controller: JewelsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [JewelsController],
      providers: [jewelsServiceMock],
    })
      .overrideGuard(AuthGuard)
      .useValue(authGuardMock)
      .compile();

    controller = module.get<JewelsController>(JewelsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
