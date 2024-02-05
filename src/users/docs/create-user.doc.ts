import { ApiProperty } from '@nestjs/swagger';
import { RoleEnum } from '../../enums/role.enum';

export class CreatedUserDoc {
  @ApiProperty({
    type: String,
    description: 'Refere-se ao nome do usuário.',
    example: 'Fulano',
    required: true,
  })
  firstName: string;

  @ApiProperty({
    type: String,
    description: 'Refere-se aos sobrenomes do usuário.',
    example: 'de Tal',
    required: true,
  })
  lastName: string;

  @ApiProperty({
    type: String,
    description: 'Refere-se ao email do usuário.',
    example: 'fulano@usuario.com',
    required: true,
  })
  email: string;

  @ApiProperty({
    type: String,
    description: 'Refere-se a url da imagem do usuário.',
    example:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxkzc13zETkv5Wqey4puj3zZos40LpznJN6uCWOpx91r1L98RjOQTAwiD4Pm9DdA5KYqo&usqp=CAU',
    required: false,
  })
  profileImg: string;

  @ApiProperty({
    type: String,
    description:
      'Refere-se a senha do usuário. No mínimo 8 caracters, precisa de 1 caracter minúsculo, precisa de 1 caracter maiúsculo, precisa de 1 número e precisa de 1 símbolo.',
    example: 'S3nh@FoRt3!',
    required: true,
  })
  password: string;

  @ApiProperty({
    type: String,
    description: 'Deve ser idêntico ao campo "password".',
    example: 'S3nh@FoRt3!',
    required: true,
  })
  confirmPassword: string;

  @ApiProperty({
    enum: RoleEnum,
    description: 'Refere-se ao tipo de usuário.',
    example: RoleEnum.customer,
    required: false,
  })
  role: RoleEnum;
}
