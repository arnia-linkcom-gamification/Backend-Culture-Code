import {
  Controller,
  Get,
  Post,
  Body,
  // Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { JewelsService } from './jewels.service';
import { CreateJewelDto } from './dto/create-jewel.dto';
//import { UpdateJewelDto } from './dto/update-jewel.dto';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/decorators/role.decorator';
import { AuthGuard } from 'src/auth/guards/auth-guard';
import { RoleEnum } from 'src/enums/role.enum';
import { RolesGuard } from 'src/auth/guards/roles-guard';
import { CreateJewelDoc } from './docs/create-jewel.doc';
import { ResponseCreateJewelDoc } from './docs/response-create-jewel.doc';

@ApiTags('4 - Joias')
@Controller('jewels')
export class JewelsController {
  constructor(private readonly jewelsService: JewelsService) {}
  @ApiBody({ type: CreateJewelDoc })
  @ApiResponse({ type: ResponseCreateJewelDoc })
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(RoleEnum.admin)
  @Post()
  create(@Body() createJewelDto: CreateJewelDto) {
    return this.jewelsService.create(createJewelDto);
  }

  @Get()
  findAll() {
    return this.jewelsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.jewelsService.findOne(+id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateJewelDto: UpdateJewelDto) {
  //   return this.jewelsService.update(+id, updateJewelDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.jewelsService.remove(+id);
  }
}
