import { PartialType } from '@nestjs/swagger';
import { IsOptional, IsUrl, Length } from 'class-validator';
import { CreateProductDto } from './create-product.dto';

export class UpdateProductDto extends PartialType(CreateProductDto) {
  @IsUrl()
  @Length(0, 256)
  @IsOptional()
  image: string;
}
