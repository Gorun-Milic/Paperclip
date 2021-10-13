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
import { CommentController } from './controller/comment/comment.controller';
import { Comment } from './entity/comment';
import { LikesModule } from './module/likes/likes.module';
import { LikesController } from './controller/likes/likes.controller';
import { Likes } from './entity/likes';
import { AuthModule } from './module/auth/auth.module';
import { AuthController } from './controller/auth/auth.controller';
import { SaveModule } from './module/save/save.module';
import { SaveController } from './controller/save/save.controller';
import { Save } from './entity/save';
import { NotificationModule } from './module/notification/notification.module';
import { NotificationController } from './controller/notification/notification.controller';
import { Notification } from './entity/notification';
import { ChatModule } from './module/chat/chat.module';
import { MessageModule } from './module/message/message.module';
import { ChatController } from './controller/chat/chat.controller';
import { MessageController } from './controller/message/message.controller';
import { Chat } from './entity/chat';
import { Message } from './entity/message';
import { Offer } from './entity/offer';
import { OfferModule } from './module/offer/offer.module';
import { OfferService } from './service/offer/offer.service';
import { OfferController } from './controller/offer/offer.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'newuser',
      password: 'newuser',
      database: 'paperclip',
      entities: [User, Product, Category, Comment, Likes, Save, Notification, Chat, Message, Offer],
      synchronize: true,
    }),
    ConfigModule.forRoot({ isGlobal: true }),
    UserModule,
    CategoryModule,
    ProductModule,
    CommentModule,
    LikesModule,
    AuthModule,
    SaveModule,
    NotificationModule,
    ChatModule,
    MessageModule,
    OfferModule
  ],
  controllers: [AppController, UserController, CategoryController, ProductController, CommentController, LikesController, AuthController, SaveController, NotificationController, ChatController, MessageController, OfferController],
  providers: [AppService],
})
export class AppModule {}
