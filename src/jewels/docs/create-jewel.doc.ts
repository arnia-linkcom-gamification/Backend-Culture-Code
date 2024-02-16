import { ApiProperty } from '@nestjs/swagger';
import { JewelTypeEnum } from '../../enums/jewel-type.enum';
import { UploadImageDto } from '../dto/create-jewel.dto';

export class CreateJewelDoc {
  @ApiProperty({
    enum: JewelTypeEnum,
    description:
      'Refere-se ao nome da joia: "Joia da Alma" || "Joia da Mente" || "Joia da Realidade" || "Joia do Espaço" || "Joia do Poder" || "Joia do Tempo"',
    example: JewelTypeEnum.soul,
    required: true,
  })
  type: JewelTypeEnum;

  @ApiProperty({
    type: 'string',
    format: 'binary',
    description: 'Imagem da joia.',
    required: true,
  })
  image: UploadImageDto;
}
