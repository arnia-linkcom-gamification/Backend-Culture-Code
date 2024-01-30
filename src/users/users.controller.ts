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

@ApiTags('2 - Usuários')
@ApiBearerAuth()
@Controller('users')
//@UseGuards(AuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiBody({ type: CreatedUserDoc })
  @ApiResponse({ type: ResponseCreateUserDoc })
  // @UseGuards(RolesGuard)
  // @Roles(RoleEnum.admin)
  async create(@Body() payload: CreateUserDto) {
    return await this.usersService.create(payload);
  }

  @Get()
  @ApiResponse({ type: ResponseAllUsersDoc, isArray: true })
  @ApiBearerAuth()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(RoleEnum.admin)
  async findAll() {
    return await this.usersService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get('me')
  @ApiResponse({ type: ResponseAllUsersDoc })
  async me(@UserId() id: number) {
    return await this.usersService.findOne(id);
  }

  @Get(':id')
  @ApiResponse({ type: ResponseAllUsersDoc })
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(RoleEnum.admin)
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.usersService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Patch('me')
  async updateMe(@UserId() id: number, @Body() payload: UpdateUserDto) {
    return this.usersService.update(id, payload);
  }

  @Patch(':id')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(RoleEnum.admin)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateUserDto,
  ) {
    return await this.usersService.update(id, payload);
  }

  // @Delete('me')
  // @ApiBearerAuth()
  // @UseGuards(AuthGuard)
  // @HttpCode(HttpStatus.NO_CONTENT)
  // async deleteMe(@UserId() id: number) {
  //   return await this.usersService.softDelete(id);
  // }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.usersService.remove(+id);
  }
}
