import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ResponseCreateUserDoc } from './docs/response-create-user.doc';
import { CreatedUserDoc } from './docs/create-user.doc';

@Controller('users')
@ApiTags('Usuários')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiBody({ type: CreatedUserDoc })
  @ApiResponse({ type: ResponseCreateUserDoc })
  async create(@Body() payload: CreateUserDto) {
    return await this.usersService.create(payload);
  }

  @Get()
  async findAll() {
    return await this.usersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
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
