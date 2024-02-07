import {
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async login(payload: LoginDto) {
    try {
      const { email, password } = payload;

      const user = await this.usersRepository.findOne({
        where: { email },
        select: {
          id: true,
          password: true,
          role: true,
        },
      });

      if (!user) {
        throw new UnauthorizedException('Email or password wrong.');
      }

      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        throw new UnauthorizedException('Email or password wrong.');
      }

      const tokenPayload = {
        iss: 'arnia-linkcom-gamification',
        sub: 'authorization',
        aud: 'users-login',
        id: user.id,
        role: user.role,
      };

      const token = await this.jwtService.signAsync(tokenPayload);

      return {
        access_token: token,
      };
    } catch (error) {
      console.log(error);

      throw new HttpException(error.message, error.status);
    }
  }
}
