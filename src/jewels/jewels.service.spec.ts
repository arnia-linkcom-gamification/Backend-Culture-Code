import { Test, TestingModule } from '@nestjs/testing';
import { JewelsService } from './jewels.service';

describe('JewelsService', () => {
  let service: JewelsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JewelsService],
    }).compile();

    service = module.get<JewelsService>(JewelsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
