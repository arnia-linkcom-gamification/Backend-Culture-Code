import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { jwtOptions } from './jwt/jwt.options';

@Module({
  imports: [JwtModule.registerAsync({ ...jwtOptions, global: true })],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
