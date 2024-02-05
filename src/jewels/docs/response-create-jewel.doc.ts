import { ApiProperty } from '@nestjs/swagger';
import { JewelTypeEnum } from '../../enums/jewel-type.enum';
import { jewel } from '../../utils/consts/jewels';

export class ResponseCreateJewelDoc {
  @ApiProperty({
    enum: JewelTypeEnum,
    description: 'Refere-se ao nome da joia cadastrada.',
    example: JewelTypeEnum.mind,
  })
  type: JewelTypeEnum;

  @ApiProperty({
    type: String,
    description: 'Descrição sobre a joia cadastrada.',
    example: jewel['Joia da Alma'],
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

export class ResponseCreateJewelBadRequestDoc {
  @ApiProperty({
    type: String,
    description: 'Mensagem de joia inexistente.',
    example:
      'type must be one of the following values: Joia da Alma, Joia da Mente, Joia da Realidade, Joia do Espaço, Joia do Poder, Joia do Tempo',
  })
  message: string;

  @ApiProperty({
    type: String,
    description: 'Mensagem de erro.',
    example: 'Bad Request',
  })
  error: string;

  @ApiProperty({
    type: String,
    description: 'Status da requisição.',
    example: 400,
  })
  statusCode: number;
}

export class ResponseCreateJewelAlredyExistlDoc {
  @ApiProperty({
    type: String,
    description: 'Status da requisição.',
    example: 409,
  })
  statusCode: number;

  @ApiProperty({
    type: String,
    description: 'Mensagem de joia inexistente.',
    example: 'This jewel already exists.',
  })
  message: string;
}
