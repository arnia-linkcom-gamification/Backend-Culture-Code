import { ApiProperty } from '@nestjs/swagger';
import { ResponseAllUsersDoc } from '../../users/docs/response-all-users.doc';

export class ResponseRedeemProductDoc extends ResponseAllUsersDoc {
  @ApiProperty({
    type: Array,
    description: 'Refere-se aos produtos do usuário.',
    example: [
      {
        id: '2',
        name: 'Fone de Ouvido',
        description: 'Um fone legal',
        price: 2,
        image: null,
        createAt: '2024-02-07T01:31:11.768Z',
        updatedAt: '2024-02-07T01:31:11.768Z',
        deleteAt: null,
      },
    ],
  })
  products: string;
}
