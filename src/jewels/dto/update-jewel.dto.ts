import { PartialType } from '@nestjs/swagger';
import { CreateJewelDto } from './create-jewel.dto';

export class UpdateJewelDto extends PartialType(CreateJewelDto) {}
