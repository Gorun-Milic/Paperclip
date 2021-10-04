import { UserDto } from "./UserDto";

export class ChatDto {
    id: string;
    user1NotSeen: number;
    user2NotSeen: number;
    user1: UserDto
    user2: UserDto
}