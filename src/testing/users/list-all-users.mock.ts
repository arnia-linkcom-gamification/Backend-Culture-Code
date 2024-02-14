import { RoleEnum } from '../../enums/role.enum';

export const listAllUsersMock = [
  {
    id: 1,
    firstName: 'Glasi',
    lastName: 'Silva',
    email: 'glasi@silva.com.br',
    profileImg: null,
    jewels: [],
    products: [],
    role: RoleEnum.admin,
    credits: 10,
    deleteAt: null,
    createdAt: '2024-02-05T00:42:58.411Z',
    updatedAt: '2024-02-05T00:42:58.411Z',
  },
  {
    id: 2,
    firstName: 'Silva',
    lastName: 'Souza',
    email: 'silva@souza.com.br',
    profileImg: null,
    jewels: [],
    products: [],
    role: RoleEnum.admin,
    credits: 0,
    deleteAt: null,
    createdAt: '2024-02-05T00:42:58.411Z',
    updatedAt: '2024-02-05T00:42:58.411Z',
  },
];
