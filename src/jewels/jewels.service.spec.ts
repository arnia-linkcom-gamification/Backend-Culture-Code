import { Test, TestingModule } from '@nestjs/testing';
import { JewelsService } from './jewels.service';

describe('JewelsService', () => {
  let jewelService: JewelsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JewelsService],
    }).compile();

    jewelService = module.get<JewelsService>(JewelsService);
  });

  it('should be defined', () => {
    expect(jewelService).toBeDefined();
  });
});
