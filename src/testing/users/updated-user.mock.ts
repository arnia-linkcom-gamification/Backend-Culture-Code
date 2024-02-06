import { listAllUsersMock } from './list-all-users.mock';
import { updateUserMock } from './update-user-dto.mock';

export const updatedUserMock = Object.assign(
  listAllUsersMock[0],
  updateUserMock,
);
