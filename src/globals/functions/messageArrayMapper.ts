import { MessageDto } from "src/dto/MessageDto";
import { Message } from "src/entity/message";
import { messageMapper } from "./messageMapper";

export function messageArrayMapper(messages: Message[]): MessageDto[] {

    let messageDtos: MessageDto[] = [];

    for (let i=0; i<messages.length; i++) {
        messageDtos.push(messageMapper(messages[i]));
    }

    return messageDtos;
}