import { ChatDto } from "src/dto/ChatDto";
import { Chat } from "src/entity/chat";
import { chatMapper } from "./chatMapper";

export function chatArrayMapper(chats: Chat[]): ChatDto[] {

    let chatDtos: ChatDto[] = [];

    for (let i=0; i<chats.length; i++) {
        chatDtos.push(chatMapper(chats[i]));
    }

    return chatDtos;
}