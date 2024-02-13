import { IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { JewelTypeEnum } from '../../enums/jewel-type.enum';

export class CreateJewelDto {
  @IsEnum(JewelTypeEnum)
  @IsNotEmpty()
  type: JewelTypeEnum;

  @IsOptional()
  image: string;
}

export class UploadImageDto {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  size: number;
  // stream: Readable;
  // destination: string;
  filename: string;
  // path: string;
  buffer: Buffer;
}
