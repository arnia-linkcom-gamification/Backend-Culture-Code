import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { JewelTypeEnum } from 'src/enums/jewel-type.enum';

export class CreateJewelDto {
  @IsEnum(JewelTypeEnum)
  @IsNotEmpty()
  type: JewelTypeEnum;

  @IsString()
  @IsNotEmpty()
  habilities: string;
}
