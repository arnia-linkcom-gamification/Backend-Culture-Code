import { PartialType } from '@nestjs/swagger';
import { IsOptional, IsString, IsUrl } from 'class-validator';
import { CreateJewelDto } from './create-jewel.dto';

export class UpdateJewelDto extends PartialType(CreateJewelDto) {
  @IsString()
  @IsOptional()
  habilities: string;

  @IsUrl()
  @IsOptional()
  image: string;
}
