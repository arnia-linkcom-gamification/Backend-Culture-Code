import { RoleEnum } from '../../enums/role.enum';

export const createUserDtoMock = {
  firstName: 'Glasi',
  lastName: 'Silva',
  email: 'glasi@silva.com.br',
  password: 'Js@Nestjs2024',
  confirmPassword: 'Js@Nestjs2024',
  profileImg:
    'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.tudointeressante.com.br%2F2014%2F09%2F24-imagens-que-quebraram-todas-as-leis-de-qualquer-coisa.html&psig=AOvVaw0QXYqxCnZkc3TMOziiYUtd&ust=1707179755233000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCNil0qj6koQDFQAAAAAdAAAAABAE',
  role: RoleEnum.admin,
};
