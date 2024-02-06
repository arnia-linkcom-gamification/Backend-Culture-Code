import { ApiProperty } from '@nestjs/swagger';
import { ResponseAllUsersDoc } from '../../users/docs/response-all-users.doc';

export class ResponseAssignJewelDoc extends ResponseAllUsersDoc {
  @ApiProperty({
    type: Array,
    description:
      'No array irá constar a joia que foi atribuida ao usuário bem como outras joias que ele já tiver.',
    example: [
      {
        type: 'Joia da Mente',
        habilities:
          'A joia da alma permite acessar a essência de cada indivíduo, seu portador tem o poder de analisar, compreender e lidar com os próprios sentimentos e dos outros.',
        image: null,
        id: 7,
        createAt: '2024-01-24T23:00:56.481Z',
        updatedAt: '2024-01-24T23:00:56.481Z',
      },
    ],
  })
  jewels: string;
}
