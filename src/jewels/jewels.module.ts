import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JewelsService } from './jewels.service';
import { JewelsController } from './jewels.controller';
import { Jewel } from './entities/jewel.entity';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Jewel]), UsersModule],
  controllers: [JewelsController],
  providers: [JewelsService],
})
export class JewelsModule {}
