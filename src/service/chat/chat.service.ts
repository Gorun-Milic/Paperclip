import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ChatDto } from 'src/dto/ChatDto';
import { Chat } from 'src/entity/chat';
import { User } from 'src/entity/user';
import { ExceptionMessageEnum } from 'src/globals/ExceptionMessageEnum.enum';
import { chatArrayMapper } from 'src/globals/functions/chatArrayMapper';
import { chatMapper } from 'src/globals/functions/chatMapper';
import { Repository } from 'typeorm';

@Injectable()
export class ChatService {

    constructor(
        @InjectRepository(Chat)
        private chatRepository: Repository<Chat>
    ){}

    async findOne(chatid: string): Promise<ChatDto> {
        let res = await this.chatRepository.findOne({
            where: {
                id: chatid
            },
            relations: [
                'user1',
                'user2'
            ]
        });

        if (res) {
            return chatMapper(res);
        }else {
            throw new HttpException(
                ExceptionMessageEnum.NO_CHAT,
                HttpStatus.BAD_REQUEST,
            )
        }
    }


    async findChat(chat: Chat): Promise<Chat> {
        let res = await this.chatRepository.findOne({
            where: [
                {
                    user1: chat.user1,
                    user2: chat.user2
                },
                {
                    user1: chat.user2,
                    user2: chat.user1
                }
            ],
            relations: ['user1', 'user2']
        })
        if (res) {
            return res;
        }else {
            throw new HttpException(
                ExceptionMessageEnum.NO_CHAT,
                HttpStatus.BAD_REQUEST,
            )
            
        }
    }

    async findChats(user: User): Promise<ChatDto[]> {
        let res = await this.chatRepository.find({
            where: [
                {
                    user1: user
                },
                {
                    user2: user
                }
            ],
            relations: ['user1', 'user2']
        });
        if (res) {
            return chatArrayMapper(res);
        }else {
            throw new HttpException(
                ExceptionMessageEnum.NO_CHATS,
                HttpStatus.BAD_REQUEST,
            )
        }
    }

    async addChat(chat: Chat): Promise<Chat> {
        chat.user1NotSeen = 0;
        chat.user2NotSeen = 0;
        let res = await this.chatRepository.findOne({
            where: [
                {
                    user1: chat.user1,
                    user2: chat.user2
                },
                {
                    user1: chat.user2,
                    user2: chat.user1
                }
            ],
            relations: ['user1', 'user2']
        })
        if (res) {
            console.log("Chattt: " + res);
            throw new HttpException(
                ExceptionMessageEnum.CHAT_ALREADY_EXISTS,
                HttpStatus.BAD_REQUEST,
            )
        }else {
            return this.chatRepository.save(chat);
        }
    }


}
