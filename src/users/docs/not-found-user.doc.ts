import { ApiProperty } from '@nestjs/swagger';

export class NotFoundUser {
  @ApiProperty({
    type: Number,
    description: 'Status da requisição.',
    example: 404,
  })
  statusCode: number;

  @ApiProperty({
    type: String,
    description: 'Mensagem de usuário não encontrado.',
    example: 'User with id:5 not found.',
  })
  message: string;
}
