import { MessageDto } from "src/dto/MessageDto";
import { Message } from "src/entity/message";
import { userMapper } from "./userMapper";

export function messageMapper(message: Message): MessageDto {
    let messageDto: MessageDto = new MessageDto();
    messageDto.id = message.id;
    messageDto.text = message.text;
    messageDto.time = message.time;
    messageDto.user = userMapper(message.user);
    messageDto.chat = message.chat;

    return messageDto;
}