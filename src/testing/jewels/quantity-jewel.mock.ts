import { RoleEnum } from 'src/enums/role.enum';
import { listAllJewelsMock } from './list-all-jewels.mock';

export const quantityJewelMock = {
  id: 1,
  firstName: 'Glasi',
  lastName: 'Silva',
  email: 'glasi@silva.com.br',
  profileImg: null,
  jewels: [listAllJewelsMock[0]],
  products: [],
  role: RoleEnum.admin,
  credits: 10,
  deleteAt: null,
  createdAt: '2024-02-05T00:42:58.411Z',
  updatedAt: '2024-02-05T00:42:58.411Z',
};
