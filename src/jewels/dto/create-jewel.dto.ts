import { IsEnum, IsNotEmpty } from 'class-validator';
import { JewelTypeEnum } from '../../enums/jewel-type.enum';

export class CreateJewelDto {
  @IsEnum(JewelTypeEnum)
  @IsNotEmpty()
  type: JewelTypeEnum;
}
