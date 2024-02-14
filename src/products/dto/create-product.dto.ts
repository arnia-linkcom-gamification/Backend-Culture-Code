import {
  IsNotEmpty,
  // IsNumber,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  @Length(2, 128)
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  price: number;

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
