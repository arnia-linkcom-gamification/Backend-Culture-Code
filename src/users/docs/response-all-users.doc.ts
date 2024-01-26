import { ApiProperty } from '@nestjs/swagger';
import { ResponseCreateUserDoc } from './response-create-user.doc';

export class ResponseAllUsersDoc extends ResponseCreateUserDoc {
  @ApiProperty({
    type: Array,
    description: 'Refere-se as jóias do usuário.',
    example: [],
  })
  jewels: string;

  @ApiProperty({
    type: String,
    description: 'Refere-se aos produtos do usuário.',
    example: [],
  })
  products: string;
}
