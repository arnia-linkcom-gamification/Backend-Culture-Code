import { ApiProperty } from '@nestjs/swagger';
import { UploadImageDto } from '../dto/create-jewel.dto';

export class UpdateJewelDoc {
  @ApiProperty({
    type: String,
    description: 'Inserir texto atualizado para a joia.',
    example:
      'A Jóia da Mente permite ao portador ler os pensamentos e sonhos de outros seres. Em suma, o usuário pode ler todas as mentes existentes, seja elas de um mini-verso ou um multiverso, pode usar telepatia, além de manipular e alterar a mente do inimigo.',
  })
  habilities: string;

  @ApiProperty({
    type: 'string',
    format: 'binary',
    description: 'Imagem da joia.',
    required: true,
  })
  image: UploadImageDto;
}
