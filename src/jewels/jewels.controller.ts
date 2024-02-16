import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
  HttpStatus,
  HttpCode,
  ParseIntPipe,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiConflictResponse,
  ApiConsumes,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JewelsService } from './jewels.service';
import { CreateJewelDto, UploadImageDto } from './dto/create-jewel.dto';
import { UpdateJewelDto } from './dto/update-jewel.dto';
import { Roles } from '../decorators/role.decorator';
import { AuthGuard } from '../auth/guards/auth-guard';
import { RoleEnum } from '../enums/role.enum';
import { RolesGuard } from '../auth/guards/roles-guard';
import { CreateJewelDoc } from './docs/create-jewel.doc';
import {
  ResponseCreateJewelAlredyExistlDoc,
  ResponseCreateJewelBadRequestDoc,
  ResponseCreateJewelDoc,
} from './docs/response-create-jewel.doc';
import { ResponseFindJewelById } from './docs/response-find-jewel-by-id.doc';
import { ResponseUpdateJewelDoc } from './docs/response-update-jewel.doc';
import { ResponseAssignJewelDoc } from './docs/response-assign-jewel.doc';
import { NotFoundJewel } from './docs/not-found-jewel.doc';
import { UpdateJewelDoc } from './docs/update-jewel.doc';
import { NotFoundUser } from '../users/docs/not-found-user.doc';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('4 - Joias')
@Controller('jewels')
export class JewelsController {
  constructor(private readonly jewelsService: JewelsService) {}

  @Post()
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: CreateJewelDoc })
  @ApiCreatedResponse({ type: ResponseCreateJewelDoc })
  @ApiBadRequestResponse({ type: ResponseCreateJewelBadRequestDoc })
  @ApiConflictResponse({ type: ResponseCreateJewelAlredyExistlDoc })
  @ApiBearerAuth()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(RoleEnum.admin)
  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors(FileInterceptor('jewelImage'))
  async create(
    @Body() payload: CreateJewelDto,
    @UploadedFile() jewelImage: UploadImageDto,
  ) {
    return await this.jewelsService.create(payload, jewelImage);
  }

  @Get()
  @ApiOkResponse({ type: ResponseCreateJewelDoc, isArray: true })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  async findAll() {
    return await this.jewelsService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: ResponseFindJewelById })
  @ApiNotFoundResponse({ type: NotFoundJewel })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.jewelsService.findOne(id);
  }

  @Patch(':id')
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: UpdateJewelDoc })
  @ApiOkResponse({ type: ResponseUpdateJewelDoc })
  @ApiNotFoundResponse({ type: NotFoundJewel })
  @ApiBearerAuth()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(RoleEnum.admin)
  @UseInterceptors(FileInterceptor('jewelImage'))
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateJewelDto,
    @UploadedFile() jewelImage: UploadImageDto,
  ) {
    return await this.jewelsService.update(id, payload, jewelImage);
  }

  @Post(':jewelId/user/:userId')
  @ApiCreatedResponse({ type: ResponseAssignJewelDoc })
  @ApiNotFoundResponse({ type: NotFoundJewel })
  @ApiNotFoundResponse({ type: NotFoundUser })
  @ApiBearerAuth()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(RoleEnum.admin)
  async assign(
    @Param('jewelId', ParseIntPipe) jewelId: number,
    @Param('userId', ParseIntPipe) userId: number,
  ) {
    return await this.jewelsService.assign(jewelId, userId);
  }
}
