import { PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsUrl, Length } from 'class-validator';
import { CreateProductDto } from './create-product.dto';

export class UpdateProductDto extends PartialType(CreateProductDto) {
  @IsUrl()
  @IsNotEmpty()
  @Length(0, 256)
  @IsOptional()
  image: string;
}
