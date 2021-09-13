import { UserDto } from "src/dto/UserDto";
import { User } from "src/entity/user";
import { userMapper } from "./userMapper";

export function userArrayMapper(users: User[]): UserDto[] {

    let userDtos: UserDto[] = [];

    for (let i=0; i<users.length; i++) {
        userDtos.push(userMapper(users[i]));
    }

    return userDtos;
}