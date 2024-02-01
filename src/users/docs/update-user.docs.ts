import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDoc {
  @ApiProperty({
    type: String,
    description: 'Refere-se ao nome do usuário.',
    example: 'Beltrano',
    required: true,
  })
  firstName: string;

  @ApiProperty({
    type: String,
    description: 'Refere-se ao email do usuário.',
    example: 'beltrano@usuario.com',
    required: true,
  })
  email: string;

  @ApiProperty({
    type: String,
    description:
      'Refere-se a senha do usuário. No mínimo 8 caracters, precisa de 1 caracter minúsculo, precisa de 1 caracter maiúsculo, precisa de 1 número e precisa de 1 símbolo.',
    example: 'S3nh@frac4',
    required: true,
  })
  password: string;

  @ApiProperty({
    type: String,
    description: 'Deve ser idêntico ao campo "password".',
    example: 'S3nh@frac4',
    required: true,
  })
  confirmPassword: string;
}
