import { PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import {
  IsString,
  IsOptional,
  IsNumber,
  IsNotEmpty,
  IsStrongPassword,
  MinLength,
  ValidateIf,
} from 'class-validator';
import { Match } from 'src/decorators/macth.decorator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsString()
  @IsOptional()
  @MinLength(8)
  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minNumbers: 1,
    minSymbols: 1,
    minUppercase: 1,
  })
  password: string;

  @ValidateIf((object) => object.password !== undefined)
  @IsString()
  @IsNotEmpty()
  @Match('password', { message: "Passwords don't matches." })
  confirmPassword: string;

  @IsNumber()
  @IsOptional()
  credits: number;
}
