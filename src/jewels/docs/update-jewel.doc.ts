import { ApiProperty } from '@nestjs/swagger';

export class CreateJewelDoc {
  @ApiProperty({
    type: String,
    description:
      'Inserir texto atualizado para a joia. Este é um campo opcional para atualização.',
    example: 'Este é o novo texto para a joia',
  })
  habilities: string;

  @ApiProperty({
    type: String,
    description:
      'Indicar novo caminho da imagem. Este é um campo opcional para atualização.',
    example: 'caminho/da/imagem',
  })
  image: string;
}
