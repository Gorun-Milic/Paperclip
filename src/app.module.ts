import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Product } from './entity/product';
import { User } from './entity/user';
import { UserModule } from './module/user/user/user.module';
import { UserController } from './controller/user/user/user.controller';
import { ConfigModule } from '@nestjs/config';
import { Category } from './entity/category';
import { CategoryController } from './controller/category/category/category.controller';
import { CategoryModule } from './module/category/category/category.module';
import { ProductController } from './controller/product/product/product.controller';
import { ProductModule } from './module/product/product/product.module';
import { CommentModule } from './module/comment/comment.module';
import { CommentService } from './service/comment/comment.service';
import { CommentController } from './controller/comment/comment.controller';
import { Comment } from './entity/comment';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'newuser',
      password: 'newuser',
      database: 'paperclip',
      entities: [User, Product, Category, Comment],
      synchronize: true,
    }),
    ConfigModule.forRoot({ isGlobal: true }),
    UserModule,
    CategoryModule,
    ProductModule,
    CommentModule
  ],
  controllers: [AppController, UserController, CategoryController, ProductController, CommentController],
  providers: [AppService],
})
export class AppModule {}
