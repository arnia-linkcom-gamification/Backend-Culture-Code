import { RoleEnum } from '../../enums/role.enum';
//import { listAllJewelsMock } from '../jewels/list-all-jewels.mock';
import { productMock } from './product.mock';

export const redeemProductsMock = {
  id: 1,
  firstName: 'Glasi',
  lastName: 'Silva',
  email: 'glasi@silva.com.br',
  profileImg: null,
  jewels: [],
  products: [productMock],
  role: RoleEnum.admin,
  credits: 9,
  deleteAt: null,
  createdAt: '2024-02-05T00:42:58.411Z',
  updatedAt: '2024-02-05T00:42:58.411Z',
};
