import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateJewelDto {
  @IsString()
  @Length(0, 32)
  @IsNotEmpty()
  type: string;

  @IsString()
  @IsNotEmpty()
  habilities: string;
}
