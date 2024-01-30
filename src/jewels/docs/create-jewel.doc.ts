import { ApiProperty } from '@nestjs/swagger';
import { JewelTypeEnum } from '../../enums/jewel-type.enum';

export class CreateJewelDoc {
  @ApiProperty({
    enum: JewelTypeEnum,
    description: 'Refere-se ao nome da joia.',
    example: JewelTypeEnum.alma,
    required: true,
  })
  role: JewelTypeEnum;
}
