import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LikesController } from 'src/controller/likes/likes.controller';
import { Likes } from 'src/entity/likes';
import { LikesService } from 'src/service/likes/likes.service';

@Module({
    imports: [TypeOrmModule.forFeature([Likes])],
    controllers: [LikesController],
    providers: [LikesService],
    exports: [LikesService]
})
export class LikesModule {}
