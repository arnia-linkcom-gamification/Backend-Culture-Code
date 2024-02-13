import { UsersService } from '../../users/users.service';
import { listAllUsersMock } from './list-all-users.mock';
import { updatedUserMock } from './updated-user.mock';
import { userMock } from './user.mock';

export const usersServiceMock = {
  provide: UsersService,
  useValue: {
    create: jest.fn().mockResolvedValueOnce(userMock),
    findAll: jest.fn().mockResolvedValueOnce(listAllUsersMock),
    findOne: jest.fn().mockReturnValue(userMock),
    update: jest.fn().mockReturnValue(updatedUserMock),
    softDelete: jest.fn(),
    restore: jest.fn(),
  },
};
