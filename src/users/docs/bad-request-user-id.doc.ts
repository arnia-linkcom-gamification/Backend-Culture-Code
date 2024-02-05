import { ApiProperty } from '@nestjs/swagger';

export class BadRequestUserId {
  @ApiProperty({
    type: String,
    description: 'Mensagem de erro de validação.',
    example: 'Validation failed (numeric string is expected)',
  })
  message: string;

  @ApiProperty({
    type: String,
    description: 'Mensagem do erro http.',
    example: 'Bad Request"',
  })
  error: string;

  @ApiProperty({
    type: Number,
    description: 'Status da requisição.',
    example: 400,
  })
  statusCode: number;
}
