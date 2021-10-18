import { UserDto } from "src/dto/UserDto";

export function userMapper(user): UserDto {
    let userDto: UserDto = new UserDto;

    userDto.id = user.id;
    userDto.firstName = user.firstName;
    userDto.lastName = user.lastName;
    userDto.email = user.email;
    userDto.password = user.password;
    userDto.city = user.city;
    userDto.zipcode = user.zipcode;

    if (user.photo) {
        let buff = user.photo;
        userDto.photo = buff.toString('base64');
    }
    return userDto;
}