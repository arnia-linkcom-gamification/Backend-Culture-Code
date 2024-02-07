import { Test, TestingModule } from '@nestjs/testing';
import { JewelsController } from './jewels.controller';
import { JewelsService } from './jewels.service';

describe('JewelsController', () => {
  let controller: JewelsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [JewelsController],
      providers: [JewelsService],
    }).compile();

    controller = module.get<JewelsController>(JewelsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
