import { Chat } from "src/entity/chat";
import { User } from "src/entity/user";

export class CountMessageDto {
    chat: Chat;
    user: User
}