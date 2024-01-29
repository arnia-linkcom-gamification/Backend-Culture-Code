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
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ResponseCreateUserDoc } from './docs/response-create-user.doc';
import { CreatedUserDoc } from './docs/create-user.doc';
import { Roles } from 'src/decorators/role.decorator';
import { RoleEnum } from 'src/enums/role.enum';
import { AuthGuard } from 'src/auth/guards/auth-guard';
import { RolesGuard } from 'src/auth/guards/roles-guard';
import { UserId } from 'src/decorators/userId.decorator';
import { ResponseAllUsersDoc } from './docs/response-all-users.doc';

@ApiTags('Usuários')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiBody({ type: CreatedUserDoc })
  @ApiResponse({ type: ResponseCreateUserDoc })
  async create(@Body() payload: CreateUserDto) {
    return await this.usersService.create(payload);
  }

  @Get()
  @ApiBearerAuth()
  @ApiResponse({ type: ResponseAllUsersDoc, isArray: true })
  @ApiBearerAuth()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(RoleEnum.admin)
  async findAll() {
    return await this.usersService.findAll();
  }

  @Get('me')
  @ApiBearerAuth()
  @ApiResponse({ type: ResponseAllUsersDoc })
  @UseGuards(AuthGuard)
  async me(@UserId() id: number) {
    return await this.usersService.me(id);
  }

  // @Get('eu')
  // @ApiBearerAuth()
  // @UseGuards(AuthGuard)
  // async me(@UserId() id: number) {
  //   return await this.usersService.me(id);
  // }

  // @Patch('eu')
  // @ApiBearerAuth()
  // @UseGuards(AuthGuard)
  // async edit(@UserId() id: number, @Body() payload: UpdateUserDto) {
  //   return this.usersService.edit(id, payload);
  // }

  // @Delete('eu')
  // @ApiBearerAuth()
  // @UseGuards(AuthGuard)
  // @HttpCode(HttpStatus.NO_CONTENT)
  // async deleteMe(@UserId() id: number) {
  //   return await this.usersService.softDelete(id);
  // }

  @Get(':id')
  @ApiBearerAuth()
  @ApiResponse({ type: ResponseAllUsersDoc })
  @UseGuards(AuthGuard)
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.usersService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() payload: UpdateUserDto) {
    return await this.usersService.update(+id, payload);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.usersService.remove(+id);
  }
}
