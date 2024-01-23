import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { jwtOptions } from './jwt/jwt.options';
import { User } from 'src/users/entities/user.entity';

@Module({
  imports: [
    JwtModule.registerAsync({ ...jwtOptions, global: true }),
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
