import { UsersService } from '../../users/users.service';

export const usersServiceMock = {
  provide: UsersService,
  useValue: {
    findByEmail: jest.fn(),
    findById: jest.fn(),
    create: jest.fn(),
    find: jest.fn(),
  },
};
