import { getRepositoryToken } from '@nestjs/typeorm';
import { UsersJewels } from '../../jewels/entities/users-jewels.entity';
export const usersJewelsRepositoryMock = {
  provide: getRepositoryToken(UsersJewels),
  useValue: {
    create: jest.fn(),
    save: jest.fn(),
    remove: jest.fn(),
  },
};
