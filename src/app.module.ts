import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Product } from './entity/product';
import { User } from './entity/user';
import { UserModule } from './module/user/user/user.module';
import { UserController } from './controller/user/user/user.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'newuser',
      password: 'newuser',
      database: 'paperclip',
      entities: [User, Product],
      synchronize: true,
    }),
    ConfigModule.forRoot({ isGlobal: true }),
    UserModule
  ],
  controllers: [AppController, UserController],
  providers: [AppService],
})
export class AppModule {}
