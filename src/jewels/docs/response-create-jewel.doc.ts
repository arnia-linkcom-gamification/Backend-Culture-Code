import { ApiProperty } from '@nestjs/swagger';
import { JewelTypeEnum } from 'src/enums/jewel-type.enum';
export class ResponseCreateJewelDoc {
  @ApiProperty({
    enum: JewelTypeEnum,
    description: 'Refere-se ao nome da joia cadastrada.',
    example: JewelTypeEnum.alma,
  })
  type: JewelTypeEnum;

  @ApiProperty({
    type: String,
    description: 'Descrição sobre a joia cadastrada.',
    example: 'A joia da alma permite acessar a essência de cada indivíduo, ...',
  })
  habilities: string;

  @ApiProperty({
    type: String,
    description: 'É o caminho da imagem referente a joia cadastrada',
    example: null,
  })
  image: string;

  @ApiProperty({
    type: Number,
    description: 'É a chave única da joia no banco de dados',
    example: 7,
  })
  id: number;

  @ApiProperty({
    type: Date,
    description: 'Data de inclusão do objeto no banco de dados',
    example: '2024-01-24T23:00:56.481Z',
  })
  createAt: Date;

  @ApiProperty({
    type: Date,
    description: 'Registra data que houve alguma atualização do objeto',
    example: '2024-01-24T23:00:56.481Z',
  })
  updatedAt: Date;
}
