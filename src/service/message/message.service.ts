import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CountMessageDto } from 'src/dto/CountMessageDto';
import { MessageDto } from 'src/dto/MessageDto';
import { Chat } from 'src/entity/chat';
import { Message } from 'src/entity/message';
import { User } from 'src/entity/user';
import { ExceptionMessageEnum } from 'src/globals/ExceptionMessageEnum.enum';
import { messageArrayMapper } from 'src/globals/functions/messageArrayMapper';
import { Not, Repository } from 'typeorm';

@Injectable()
export class MessageService {


    constructor(
        @InjectRepository(Message)
        private messageRepository: Repository<Message>
    ){}


    async addMesage(message: Message): Promise<Message> {
        message.time = new Date().toISOString().slice(0, 19).replace('T', ' ');   
        return this.messageRepository.save(message);
    }

    async findMessages(chat: Chat): Promise<MessageDto[]> {
        let res = await this.messageRepository.find(
            {
                where: {
                    chat: chat
                },
                order: {
                    time: 'ASC'
                },
                relations: ['chat', 'user']
            },
        );
        if (res) {
            return messageArrayMapper(res);
        }else {
            throw new HttpException(
                ExceptionMessageEnum.NO_MESSAGES,
                HttpStatus.BAD_REQUEST,
            )
        }
    }

    async findLastMessage(chat: Chat): Promise<Message> {
        let res = await this.messageRepository.find(
            {
                where: {
                    chat: chat
                },
                order: {
                    time: 'DESC'
                },
                take: 1
            },
        );
        if (res) {
            return res.pop();
        }else {
            throw new HttpException(
                ExceptionMessageEnum.NO_LAST_MESSAGES,
                HttpStatus.BAD_REQUEST,
            )
        }
        
    }

    async countNewMessages(user: User): Promise<number> {
        const [result, total] = await this.messageRepository.findAndCount({
            where: [
                {
                    user: {
                        id: Not(user.id)
                    },
                    
                    chat: {
                        user1: {id: Not(user.id)},
                        user2: user
                    },
                        
                    seen: 0,
                },
                {
                    user: {
                        id: Not(user.id)
                    },
                    
                    chat: {
                        user2: {id: Not(user.id)},
                        user1: user
                    },
                        
                    seen: 0,
                }
            ],
            relations: ['chat', 'user', 'chat.user1', 'chat.user2']
        });

        return total;
    }

    async countNewMessagesInChat(countMessageDto: CountMessageDto): Promise<number> {
        const [result, total] = await this.messageRepository.findAndCount({
            where: {
                chat: {id: countMessageDto.chat.id},
                user: {id: Not(countMessageDto.user.id)},
                seen: 0
            },
            relations: ['chat', 'user']
        });

        return total;
    }

    async updateMessage(countMessage: CountMessageDto): Promise<any> {
        const result = await this.messageRepository
            .createQueryBuilder('m')
            .innerJoin('m.chat', 'chat')
            .innerJoin('m.user', 'user')
            .update(Message)
            .set({seen: 1})
            .where('seen = :seen', {seen: 0})
            .andWhere('chat.id = :cId', {cId: countMessage.chat.id})
            .andWhere('user.id != :uId', {uId: countMessage.user.id})
            .execute()
        
            if (result) {
                return result;
            }else {
                throw new HttpException(
                    ExceptionMessageEnum.NO_OLD_NOTIFICATION,
                    HttpStatus.BAD_REQUEST,
                )
            }
    }

}
