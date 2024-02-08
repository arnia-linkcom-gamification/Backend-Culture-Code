import { listAllJewelsMock } from '../jewels/list-all-jewels.mock';
import { userMock } from './user.mock';

export const usersJewelsMock = {
  id: 1,
  user: userMock,
  jewel: listAllJewelsMock[0],
};
