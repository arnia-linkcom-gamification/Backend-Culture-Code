import { ApiProperty } from '@nestjs/swagger';

export class NotFoundJewel {
  @ApiProperty({
    type: Number,
    description: 'Status da requisição.',
    example: 404,
  })
  statusCode: number;

  @ApiProperty({
    type: String,
    description: 'Mensagem de usuário não encontrado.',
    example: 'Jewel with id:12 not found.',
  })
  message: string;
}
