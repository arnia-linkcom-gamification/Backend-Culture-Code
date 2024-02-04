import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  ApiBody,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';
import { LoginDoc } from './docs/login.doc';
import {
  OkResponseLoginDoc,
  UnauthorizedResponseLoginDoc,
} from './docs/Response-login.doc';

@Controller()
@ApiTags('1 - Autenticação')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiBody({ type: LoginDoc })
  @ApiOkResponse({ type: OkResponseLoginDoc })
  @ApiUnauthorizedResponse({ type: UnauthorizedResponseLoginDoc })
  @HttpCode(HttpStatus.OK)
  async login(@Body() payload: LoginDto) {
    return await this.authService.login(payload);
  }
}
