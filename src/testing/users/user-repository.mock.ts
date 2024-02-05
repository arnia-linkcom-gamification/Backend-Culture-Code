import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../../users/entities/user.entity';
import { userMock } from './user.mock';
import { listAllUsersMock } from './list-all-users.mock';

export const userRepositoryMock = {
  provide: getRepositoryToken(User),
  useValue: {
    exists: jest.fn().mockResolvedValue(false),
    create: jest.fn().mockReturnValue(userMock),
    save: jest.fn(),
    find: jest.fn().mockResolvedValue(listAllUsersMock),
    findOne: jest.fn(),
    update: jest.fn(),
    softDelete: jest.fn(),
    restore: jest.fn(),
  },
};
