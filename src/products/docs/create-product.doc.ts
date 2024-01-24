import { ApiProperty } from '@nestjs/swagger';

export class CreatedProductDoc {
  @ApiProperty({
    type: String,
    description: 'Refere-se ao nome do produto',
    example: 'Nome do Produto',
    required: true,
  })
  name: string;
  @ApiProperty({
    type: String,
    description: 'Incluir texto sobre descrição do produto',
    example: 'Descrição do produto',
    required: true,
  })
  description: string;
  @ApiProperty({
    type: Number,
    description: 'Incluir preço do produto no formato inteiro',
    example: 3282,
    required: true,
  })
  price: number;
}
