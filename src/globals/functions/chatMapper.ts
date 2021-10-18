import { ChatDto } from "src/dto/ChatDto";
import { Chat } from "src/entity/chat";
import { userMapper } from "./userMapper";

export function chatMapper(chat: Chat): ChatDto {
    let chatDto: ChatDto = new ChatDto();
    chatDto.id = chat.id;
    chatDto.user1NotSeen = chat.user1NotSeen;
    chatDto.user2NotSeen = chat.user2NotSeen;
    chatDto.user1 = userMapper(chat.user1);
    chatDto.user2 = userMapper(chat.user2);

    return chatDto;
}