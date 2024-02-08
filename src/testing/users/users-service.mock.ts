import { UsersService } from '../../users/users.service';

export const usersServiceMock = {
  provide: UsersService,
  useValue: {
    create: jest.fn(),
    findAll: jest.fn(),
    me: jest.fn(),
    findOne: jest.fn(),
    updatedMe: jest.fn(),
    update: jest.fn(),
    deleteMe: jest.fn(),
    remove: jest.fn(),
    restore: jest.fn(),
  },
};
