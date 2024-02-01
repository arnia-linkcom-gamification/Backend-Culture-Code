import { ApiProperty } from '@nestjs/swagger';
import { JewelTypeEnum } from '../../enums/jewel-type.enum';

export class CreateJewelDoc {
  @ApiProperty({
    enum: JewelTypeEnum,
    description:
      'Refere-se ao nome da joia: Joia da Alma || Joia da Mente || Joia da Realidade || Joia do Espaço || Joia do Poder || Joia do Tempo',
    example: JewelTypeEnum.alma,
    required: true,
  })
  role: JewelTypeEnum;
}
