import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../../users/entities/user.entity';
import { userMock } from './user.mock';
import { listAllUsersMock } from './list-all-users.mock';
import { assignJewelUserMock } from '../jewels/assing-jewel-user.mock';

export const userRepositoryMock = {
  provide: getRepositoryToken(User),
  useValue: {
    exists: jest.fn().mockResolvedValue(false),
    create: jest.fn().mockReturnValue(userMock),
    save: jest.fn(),
    find: jest.fn().mockResolvedValue(listAllUsersMock),
    findOne: jest.fn().mockResolvedValue(listAllUsersMock[0]),
    update: jest.fn().mockResolvedValue(assignJewelUserMock),
    softDelete: jest.fn(),
    restore: jest.fn(),
  },
};
