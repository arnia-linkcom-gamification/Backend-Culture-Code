import { ApiProperty } from '@nestjs/swagger';

export class LoginDoc {
  @ApiProperty({
    type: String,
    description: 'Refere-se ao email do usuário.',
    example: 'fulano@usuario.com',
    required: true,
  })
  email: string;

  @ApiProperty({
    type: String,
    description: 'Refere-se a senha do usuário.',
    example: 'S3nh@FoRt3!',
    required: true,
  })
  password: string;
}
