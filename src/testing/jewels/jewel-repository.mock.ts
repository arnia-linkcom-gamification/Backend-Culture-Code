import { getRepositoryToken } from '@nestjs/typeorm';
import { Jewel } from '../../jewels/entities/jewel.entity';

export const jewelRepositoryMock = {
  provide: getRepositoryToken(Jewel),
  useValue: {
    exists: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    createQueryBuilder: jest.fn(),
  },
};
