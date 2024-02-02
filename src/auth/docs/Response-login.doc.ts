import { ApiProperty } from '@nestjs/swagger';

export class OkResponseLoginDoc {
  @ApiProperty({
    type: String,
    description: 'Retorno da token JWT.',
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJhcm5pYS1saW5rY29tLWdhbWlmaWNhdGlvbiIsInN1YiI6ImF1dGhvcml6YXRpb24iLCJhdWQiOiJ1c2Vycy1sb2dpbiIsImlkIjoiMiIsInJvbGUiOiJjdXN0b21lciIsImlhdCI6MTcwNjgyNzQ0MywiZXhwIjoxNzA2ODI4MDQzfQ.oniktZs9P05TSHKNG_57hedoyMlndgf4Bp-SfLnxacM',
  })
  token: string;
}

export class UnauthorizedResponseLoginDoc {
  @ApiProperty({
    type: String,
    description: 'Status da requisição.',
    example: 401,
  })
  statusCode: number;

  @ApiProperty({
    type: String,
    description: 'Mensagem de não autorizado.',
    example: 'Email or password wrong.',
  })
  message: string;
}
