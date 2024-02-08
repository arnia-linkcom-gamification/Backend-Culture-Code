import { RoleEnum } from '../../enums/role.enum';
import { productMock } from '../products/product.mock';

export const userMock = {
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
