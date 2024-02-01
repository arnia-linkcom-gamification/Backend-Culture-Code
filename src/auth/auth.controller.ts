import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';
import { LoginDoc } from './docs/login.doc';
import { ResponseLoginDoc } from './docs/Response-login.doc';

@Controller()
@ApiTags('1 - Autenticação')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiBody({ type: LoginDoc })
  @ApiResponse({ type: ResponseLoginDoc, status: HttpStatus.OK })
  @HttpCode(HttpStatus.OK)
  async login(@Body() payload: LoginDto) {
    return await this.authService.login(payload);
  }
}
