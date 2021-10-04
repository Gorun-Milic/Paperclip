import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatController } from 'src/controller/chat/chat.controller';
import { Chat } from 'src/entity/chat';
import { ChatService } from 'src/service/chat/chat.service';

@Module({
    imports: [TypeOrmModule.forFeature([Chat])],
    controllers: [ChatController],
    providers: [ChatService],
    exports: [ChatService]
})
export class ChatModule {}
