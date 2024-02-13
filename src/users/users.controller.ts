import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ParseIntPipe,
  HttpStatus,
  HttpCode,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateUserDto, UploadImageDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  ResponseCreateUserDoc,
  ResponseCreateUserEmailExistDoc,
} from './docs/response-create-user.doc';
import { CreatedUserDoc } from './docs/create-user.doc';
import { Roles } from '../decorators/role.decorator';
import { RoleEnum } from '../enums/role.enum';
import { AuthGuard } from '../auth/guards/auth-guard';
import { RolesGuard } from '../auth/guards/roles-guard';
import { UserId } from '../decorators/userId.decorator';
import { ResponseAllUsersDoc } from './docs/response-all-users.doc';
import { ResponseUpdateUserDoc } from './docs/response-update-user.doc';
import { UpdateUserDoc } from './docs/update-user.docs';
import { NotFoundUser } from './docs/not-found-user.doc';
import { BadRequestUserId } from './docs/bad-request-user-id.doc';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('2 - Usuários')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiBody({ type: CreatedUserDoc })
  @ApiCreatedResponse({ type: ResponseCreateUserDoc })
  @ApiConflictResponse({ type: ResponseCreateUserEmailExistDoc })
  @UseInterceptors(FileInterceptor('image'))
  async create(
    @Body() payload: CreateUserDto,
    @UploadedFile() image?: UploadImageDto,
  ) {
    return await this.usersService.create(payload, image);
  }

  @Get()
  @ApiOkResponse({
    type: ResponseAllUsersDoc,
    isArray: true,
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(RoleEnum.admin)
  async findAll() {
    return await this.usersService.findAll();
  }

  @Get('me')
  @ApiOkResponse({ type: ResponseAllUsersDoc })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  async me(@UserId() id: number) {
    return await this.usersService.findOne(id);
  }

  @Get(':id')
  @ApiOkResponse({ type: ResponseAllUsersDoc })
  @ApiNotFoundResponse({ type: NotFoundUser })
  @ApiBadRequestResponse({ type: BadRequestUserId })
  @ApiBearerAuth()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(RoleEnum.admin)
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.usersService.findOne(id);
  }

  @Patch('me')
  @ApiBody({ type: UpdateUserDoc })
  @ApiOkResponse({ type: ResponseUpdateUserDoc })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('image'))
  async updateMe(
    @UserId() id: number,
    @Body() payload: UpdateUserDto,
    @UploadedFile() image?: UploadImageDto,
  ) {
    return this.usersService.update(id, payload, image);
  }

  @Patch(':id')
  @ApiBody({ type: UpdateUserDoc })
  @ApiOkResponse({ type: ResponseUpdateUserDoc })
  @ApiNotFoundResponse({ type: NotFoundUser })
  @ApiBadRequestResponse({ type: BadRequestUserId })
  @ApiBearerAuth()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(RoleEnum.admin)
  @UseInterceptors(FileInterceptor('image'))
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateUserDto,
    @UploadedFile() image?: UploadImageDto,
  ) {
    return await this.usersService.update(id, payload, image);
  }

  @Delete('me')
  @ApiNoContentResponse()
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteMe(@UserId() id: number) {
    return await this.usersService.softDelete(id);
  }

  @Delete(':id')
  @ApiNoContentResponse()
  @ApiBadRequestResponse({ type: BadRequestUserId })
  @ApiBearerAuth()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(RoleEnum.admin)
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.usersService.softDelete(id);
  }

  @Patch(':id/restore')
  @ApiNoContentResponse()
  @ApiBadRequestResponse({ type: BadRequestUserId })
  @ApiBearerAuth()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(RoleEnum.admin)
  @HttpCode(HttpStatus.NO_CONTENT)
  async restore(@Param('id', ParseIntPipe) id: number) {
    return await this.usersService.restore(id);
  }
}
