import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JewelsService } from './jewels.service';
import { JewelsController } from './jewels.controller';
import { Jewel } from './entities/jewel.entity';
import { UsersService } from 'src/users/users.service';

@Module({
  imports: [TypeOrmModule.forFeature([Jewel]), UsersService],
  controllers: [JewelsController],
  providers: [JewelsService],
})
export class JewelsModule {}
