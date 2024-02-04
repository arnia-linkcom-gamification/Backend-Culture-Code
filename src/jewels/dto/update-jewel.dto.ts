import { PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsUrl } from 'class-validator';
import { CreateJewelDto } from './create-jewel.dto';

export class UpdateJewelDto extends PartialType(CreateJewelDto) {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  habilities: string;

  @IsUrl()
  @IsNotEmpty()
  @IsOptional()
  image: string;
}
