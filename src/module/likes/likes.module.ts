import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LikesController } from 'src/controller/likes/likes.controller';
import { Likes } from 'src/entity/likes';
import { LikesService } from 'src/service/likes/likes.service';
import { NotificationModule } from '../notification/notification.module';

@Module({
    imports: [TypeOrmModule.forFeature([Likes]), NotificationModule],
    controllers: [LikesController],
    providers: [LikesService],
    exports: [LikesService]
})
export class LikesModule {}
