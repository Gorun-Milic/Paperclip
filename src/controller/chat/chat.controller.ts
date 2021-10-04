import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ChatDto } from 'src/dto/ChatDto';
import { Chat } from 'src/entity/chat';
import { User } from 'src/entity/user';
import { ChatService } from 'src/service/chat/chat.service';

@Controller('chat')
export class ChatController {

    constructor(
        private chatService: ChatService
    ){}

    @Post('add')
    async addChat(@Body() chat: Chat): Promise<Chat> {
        return await this.chatService.addChat(chat);
    }

    @Post('findChat')
    async findChat(@Body() chat: Chat): Promise<Chat> {
        return await this.chatService.findChat(chat);
    }

    @Get(':id')
    async findOne(@Param('id') id): Promise<ChatDto> {
        return await this.chatService.findOne(id);
    }

    @Post('findChats')
    async findChats(@Body() user: User): Promise<ChatDto[]> {
        return await this.chatService.findChats(user);
    }

}
