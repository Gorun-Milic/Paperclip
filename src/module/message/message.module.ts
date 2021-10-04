import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessageController } from 'src/controller/message/message.controller';
import { Message } from 'src/entity/message';
import { MessageService } from 'src/service/message/message.service';
import { ChatModule } from '../chat/chat.module';

@Module({
    imports: [TypeOrmModule.forFeature([Message]), ChatModule],
    controllers: [MessageController],
    providers: [MessageService],
    exports: [MessageService]
})
export class MessageModule {}
