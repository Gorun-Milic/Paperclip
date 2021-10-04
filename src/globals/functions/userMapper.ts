import { UserDto } from "src/dto/UserDto";

export function userMapper(user): UserDto {
    let userDto: UserDto = new UserDto;

    console.log("User je undefined? " +  user)
    userDto.id = user.id;
    userDto.firstName = user.firstName;
    userDto.lastName = user.lastName;
    userDto.email = user.email;
    userDto.password = user.password;
    userDto.country = user.country;
    userDto.city = user.city;
    userDto.zipcode = user.zipcode;

    if (user.photo) {
        let buff = user.photo;
        userDto.photo = buff.toString('base64');
    }
    return userDto;
}