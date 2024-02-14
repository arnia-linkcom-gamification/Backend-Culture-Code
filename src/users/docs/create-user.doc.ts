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
