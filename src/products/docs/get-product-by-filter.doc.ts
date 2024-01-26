import { ApiProperty } from '@nestjs/swagger';

export class GetProductByFilterDoc {
  @ApiProperty({
    name: 'page',
    type: Number,
    required: false,
    example: 1,
  })
  page: number;
  @ApiProperty({
    name: 'productsPerPage',
    type: Number,
    required: false,
    example: 10,
  })
  productsPerPage: number;
}