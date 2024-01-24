import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './products/products.module';
import { JewelsModule } from './jewels/jewels.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.dev.env',
      isGlobal: true,
    }),
    UsersModule,
    DatabaseModule,
    AuthModule,
    ProductsModule,
    JewelsModule,
  ],
})
export class AppModule {}
