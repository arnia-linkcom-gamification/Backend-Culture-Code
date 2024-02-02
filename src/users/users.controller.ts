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
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiNoContentResponse,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ResponseCreateUserDoc } from './docs/response-create-user.doc';
import { CreatedUserDoc } from './docs/create-user.doc';
import { Roles } from 'src/decorators/role.decorator';
import { RoleEnum } from 'src/enums/role.enum';
import { AuthGuard } from 'src/auth/guards/auth-guard';
import { RolesGuard } from 'src/auth/guards/roles-guard';
import { UserId } from 'src/decorators/userId.decorator';
import { ResponseAllUsersDoc } from './docs/response-all-users.doc';
import { ResponseUpdateUserDoc } from './docs/response-update-user.doc';
import { UpdateUserDoc } from './docs/update-user.docs';

@ApiTags('2 - Usuários')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiBody({ type: CreatedUserDoc })
  @ApiResponse({ type: ResponseCreateUserDoc, status: HttpStatus.CREATED })
  async create(@Body() payload: CreateUserDto) {
    return await this.usersService.create(payload);
  }

  @Get()
  @ApiResponse({
    type: ResponseAllUsersDoc,
    isArray: true,
    status: HttpStatus.OK,
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(RoleEnum.admin)
  async findAll() {
    return await this.usersService.findAll();
  }

  @Get('me')
  @ApiResponse({ type: ResponseAllUsersDoc, status: HttpStatus.OK })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  async me(@UserId() id: number) {
    return await this.usersService.findOne(id);
  }

  @Get(':id')
  @ApiResponse({ type: ResponseAllUsersDoc, status: HttpStatus.OK })
  @ApiBearerAuth()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(RoleEnum.admin)
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.usersService.findOne(id);
  }

  @Patch('me')
  @ApiBody({ type: UpdateUserDoc })
  @ApiResponse({ type: ResponseUpdateUserDoc, status: HttpStatus.OK })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  async updateMe(@UserId() id: number, @Body() payload: UpdateUserDto) {
    return this.usersService.update(id, payload);
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    example: '2',
    description: 'O id do usuário:',
    required: true,
  })
  @ApiBody({ type: UpdateUserDoc })
  @ApiResponse({ type: ResponseUpdateUserDoc, status: HttpStatus.OK })
  @ApiBearerAuth()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(RoleEnum.admin)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateUserDto,
  ) {
    return await this.usersService.update(id, payload);
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
  @ApiBearerAuth()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(RoleEnum.admin)
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.usersService.softDelete(id);
  }

  @Patch(':id/restore')
  @ApiNoContentResponse()
  @ApiBearerAuth()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(RoleEnum.admin)
  @HttpCode(HttpStatus.NO_CONTENT)
  async restore(@Param('id', ParseIntPipe) id: number) {
    return await this.usersService.restore(id);
  }
}
