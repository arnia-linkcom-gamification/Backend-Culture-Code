import { ApiProperty } from '@nestjs/swagger';
import { ResponseCreateProductDoc } from './response-create-product.doc';

export class ResponseUpdateProductDoc extends ResponseCreateProductDoc {
  @ApiProperty({
    type: String,
    description: 'Refere-se ao nome do produto',
    example: 'Produto com Nome Atualizado',
  })
  name: string;
}
