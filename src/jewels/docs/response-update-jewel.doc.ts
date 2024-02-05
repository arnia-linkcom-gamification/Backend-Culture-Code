import { ApiProperty } from '@nestjs/swagger';
import { ResponseCreateJewelDoc } from './response-create-jewel.doc';

export class ResponseUpdateJewelDoc extends ResponseCreateJewelDoc {
  @ApiProperty({
    type: String,
    description: 'Descrição sobre a joia cadastrada.',
    example:
      'A Jóia da Mente permite ao portador ler os pensamentos e sonhos de outros seres. Em suma, o usuário pode ler todas as mentes existentes, seja elas de um mini-verso ou um multiverso, pode usar telepatia, além de manipular e alterar a mente do inimigo.',
  })
  habilities: string;
}
