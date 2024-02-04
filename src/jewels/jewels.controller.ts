import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  // Delete,
  UseGuards,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JewelsService } from './jewels.service';
import { CreateJewelDto } from './dto/create-jewel.dto';
import { UpdateJewelDto } from './dto/update-jewel.dto';
import { Roles } from 'src/decorators/role.decorator';
import { AuthGuard } from 'src/auth/guards/auth-guard';
import { RoleEnum } from 'src/enums/role.enum';
import { RolesGuard } from 'src/auth/guards/roles-guard';
import { CreateJewelDoc } from './docs/create-jewel.doc';
import {
  ResponseCreateJewelAlredyExistlDoc,
  ResponseCreateJewelBadRequestDoc,
  ResponseCreateJewelDoc,
} from './docs/response-create-jewel.doc';
import { ResponseFindJewelById } from './docs/response-find-jewel-by-id.doc';
import { ResponseUpdateJewelDoc } from './docs/response-update-jewel.doc';
import { ResponsePutJewelDoc } from './docs/response-put-jewel.doc';

@ApiTags('4 - Joias')
@Controller('jewels')
export class JewelsController {
  constructor(private readonly jewelsService: JewelsService) {}

  @Post()
  @ApiBody({ type: CreateJewelDoc })
  @ApiCreatedResponse({ type: ResponseCreateJewelDoc })
  @ApiBadRequestResponse({ type: ResponseCreateJewelBadRequestDoc })
  @ApiConflictResponse({ type: ResponseCreateJewelAlredyExistlDoc })
  @ApiBearerAuth()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(RoleEnum.admin)
  @HttpCode(HttpStatus.CREATED)
  create(@Body() payload: CreateJewelDto) {
    return this.jewelsService.create(payload);
  }

  @Get()
  @ApiOkResponse({ type: ResponseCreateJewelDoc, isArray: true })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  findAll() {
    return this.jewelsService.findAll();
  }

  @Get(':id')
  @ApiResponse({ type: ResponseFindJewelById })
  @ApiParam({
    type: Number,
    name: 'id',
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id') id: string) {
    return this.jewelsService.findOne(+id);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @ApiResponse({ type: ResponseUpdateJewelDoc })
  @ApiParam({
    type: Number,
    name: 'id',
  })
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(RoleEnum.admin)
  update(@Param('id') id: string, @Body() updateJewelDto: UpdateJewelDto) {
    return this.jewelsService.update(+id, updateJewelDto);
  }

  @Post(':idJewel/user/:idUser')
  @ApiResponse({ type: ResponsePutJewelDoc })
  @ApiBearerAuth()
  @ApiParam({
    type: Number,
    name: 'idJewel',
  })
  @ApiParam({
    type: Number,
    name: 'idUser',
  })
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(RoleEnum.admin)
  @HttpCode(HttpStatus.OK)
  putJewel(@Param('idJewel') idJewel: string, @Param('idUser') idUser: string) {
    return this.jewelsService.putJewel(+idJewel, +idUser);
  }

  // @Delete(':id')
  // @HttpCode(HttpStatus.NO_CONTENT)
  // remove(@Param('id') id: string) {
  //   return this.jewelsService.remove(+id);
  // }
}
