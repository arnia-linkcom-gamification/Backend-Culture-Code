import { Jewel } from '../../jewels/entities/jewel.entity';
import { RoleEnum } from '../../enums/role.enum';
import { Product } from '../../products/entities/product.entity';

export const responseCreateUserMock = {
  id: 1,
  firstName: 'Glasi',
  lastName: 'Silva',
  email: 'glasi@silva.com.br',
  profileImg: null,
  // password: 'Js@Nestjs2024',
  jewels: [Jewel],
  products: [Product],
  role: RoleEnum.admin,
  credits: 0,
  deleteAt: null,
  createdAt: '2024-02-05T00:42:58.411Z',
  updatedAt: '2024-02-05T00:42:58.411Z',
};
