import { Chat } from "src/entity/chat";
import { ChatDto } from "./ChatDto";
import { UserDto } from "./UserDto";

export class MessageDto {
    id: string;
    text: string;
    time: string;
    user: UserDto;
    chat: Chat
}