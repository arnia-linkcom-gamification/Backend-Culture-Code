import { RoleEnum } from '../../enums/role.enum';

export const createUserDtoMock = {
  firstName: 'Glasi',
  lastName: 'Silva',
  email: 'glasi@silva.com.br',
  password: 'Js@Nestjs2024',
  confirmPassword: 'Js@Nestjs2024',
  profileImg: null,
  role: RoleEnum.admin,
};
