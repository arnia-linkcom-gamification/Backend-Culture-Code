import { IsEnum, IsNotEmpty } from 'class-validator';
import { JewelTypeEnum } from 'src/enums/jewel-type.enum';

export class CreateJewelDto {
  @IsEnum(JewelTypeEnum)
  @IsNotEmpty()
  type: JewelTypeEnum;
}
