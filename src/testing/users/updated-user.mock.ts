import { listAllUsersMock } from './list-all-users.mock';
import { updateUserMock } from './update-user-dto.mock';

export const updatedUserMock = {
  ...updateUserMock,
  ...listAllUsersMock[0],
};
