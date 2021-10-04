import { Body, Controller, Post } from '@nestjs/common';
import { CountMessageDto } from 'src/dto/CountMessageDto';
import { MessageDto } from 'src/dto/MessageDto';
import { Chat } from 'src/entity/chat';
import { Message } from 'src/entity/message';
import { User } from 'src/entity/user';
import { MessageService } from 'src/service/message/message.service';

@Controller('message')
export class MessageController {

    constructor(
        private messageService: MessageService
    ) {}

    @Post('add')
    async addMessage(@Body() message: Message): Promise<Message> {
        return this.messageService.addMesage(message);
    }

    @Post('findMessages')
    async findMessages(@Body() chat: Chat): Promise<MessageDto[]> {
        return this.messageService.findMessages(chat);
    }

    @Post('findLastMessage')
    async findLastMessage(@Body() chat: Chat): Promise<Message> {
        return this.messageService.findLastMessage(chat);
    }

    @Post('countNewMessages')
    async countNewMessages(@Body() user: User): Promise<number> {
        return this.messageService.countNewMessages(user);
    }

    @Post('countNewMessagesInChat')
    async countNewMessagesInChat(@Body() countMessageDto: CountMessageDto): Promise<number> {
        return this.messageService.countNewMessagesInChat(countMessageDto);
    }

    @Post('updateMessage')
    async updateMessage(@Body() countMessageDto: CountMessageDto): Promise<any> {
        return this.messageService.updateMessage(countMessageDto);
    }

}
