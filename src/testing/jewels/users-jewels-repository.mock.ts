import { getRepositoryToken } from '@nestjs/typeorm';
import { UsersJewels } from '../../jewels/entities/users-jewels.entity';
import { assignJewelUserMock } from './assing-jewel-user.mock';

export const usersJewelsRepositoryMock = {
  provide: getRepositoryToken(UsersJewels),
  useValue: {
    remove: jest.fn(),
    create: jest.fn().mockResolvedValueOnce(assignJewelUserMock),
    save: jest.fn(),
  },
};
