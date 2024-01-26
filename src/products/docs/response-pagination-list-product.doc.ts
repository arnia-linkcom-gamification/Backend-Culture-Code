import { ApiProperty } from '@nestjs/swagger';

export class ResponsePaginationListProductDoc {
  @ApiProperty({
    type: String,
    description: 'Refere-se ao id do produto no banco de dados',
    example: '5',
  })
  id: string;
  @ApiProperty({
    type: String,
    description: 'Refere-se ao nome do produto',
    example: 'Nome do Produto',
  })
  name: string;

  @ApiProperty({
    type: String,
    description: 'Incluir texto sobre descrição do produto',
    example: 'Descrição do produto',
  })
  description: string;

  @ApiProperty({
    type: Number,
    description: 'Incluir preço do produto no formato inteiro',
    example: 3282,
  })
  price: number;

  @ApiProperty({
    type: String,
    description: 'Caminho do arquivo',
    example: null,
  })
  image: string;

  @ApiProperty({
    type: Date,
    description: 'Data de inclusão do objeto no banco de dados',
    example: '2024-01-24T23:00:56.481Z',
  })
  createAt: Date;

  @ApiProperty({
    type: Date,
    description: 'Registra data que houve alguma atualização do objeto',
    example: '2024-01-24T23:00:56.481Z',
  })
  updatedAt: Date;

  @ApiProperty({
    type: Date,
    description: 'Refere-se a data que o objeto foi deletado',
    example: 'null',
  })
  deleteAt: Date;

  @ApiProperty({
    type: Number,
    description:
      'Este é o número total de produtos cadastrados no banco de dados',
    example: 198,
  })
  allProducts: number;

  @ApiProperty({
    type: Number,
    description:
      'Aqui reprensenta o número total de páginas considerando. Este número é resultado da operação allProducts / productsPerPage (este vem na requisição)',
    example: 20,
  })
  totalPages: number;
}
