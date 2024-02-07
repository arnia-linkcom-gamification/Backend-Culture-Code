import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JewelsService } from './jewels.service';
import { JewelsController } from './jewels.controller';
import { Jewel } from './entities/jewel.entity';
import { UsersModule } from '../users/users.module';
import { UsersJewels } from './entities/users-jewels.entity';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([Jewel, UsersJewels]), UsersModule],
  controllers: [JewelsController],
  providers: [JewelsService],
  exports: [TypeOrmModule],
})
export class JewelsModule {}
