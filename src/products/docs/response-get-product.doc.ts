import { ApiProperty } from '@nestjs/swagger';
import { Product } from '../entities/product.entity';
export class ResponseGetProductDoc {
  @ApiProperty({
    type: Number,
    description: 'Refere-se a página atual.',
    example: 1,
  })
  currentPage: number;

  @ApiProperty({
    type: Number,
    description: 'Refere-se ao tamanho máximo da página.',
    example: 5,
  })
  pageSize: number;

  @ApiProperty({
    type: Number,
    description: 'Refere-se a quantidade de produtos encontrados.',
    example: 1,
  })
  count: number;

  @ApiProperty({
    type: String,
    description: 'Refere-se aos produtos encontrados.',
    example: [
      {
        id: '5',
        name: 'Nome do Produto',
        description: 'Descrição do produto',
        price: 3282,
        image: null,
        createAt: '2024-01-24T23:00:56.481Z',
        updatedAt: '2024-01-24T23:00:56.481Z',
        deleteAt: null,
      },
    ],
  })
  data: Product[];
}
