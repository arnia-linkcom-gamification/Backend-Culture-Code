import { getRepositoryToken } from '@nestjs/typeorm';
import { Jewel } from '../../jewels/entities/jewel.entity';
import { listAllJewelsMock } from './list-all-jewels.mock';

export const jewelRepositoryMock = {
  provide: getRepositoryToken(Jewel),
  useValue: {
    exists: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn().mockResolvedValue(listAllJewelsMock),
    findOne: jest.fn().mockResolvedValue(listAllJewelsMock[0]),
    update: jest.fn(),
    createQueryBuilder: jest.fn(),
  },
};
