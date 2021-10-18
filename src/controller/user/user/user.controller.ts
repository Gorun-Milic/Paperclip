import { Body, Controller, Get, Param, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { LoginDto } from 'src/dto/LoginDto';
import { SearchUser } from 'src/dto/SearchUser';
import { SearchUserParamsDto } from 'src/dto/SearchUserParamsDto';
import { UserDto } from 'src/dto/UserDto';
import { UserPagination } from 'src/dto/UserPagination';
import { Product } from 'src/entity/product';
import { User } from 'src/entity/user';
import { UserService } from 'src/service/user/user/user.service';

@Controller('user')
export class UserController {

    constructor(private userService: UserService) {}

    @Get()
    async findAll(): Promise<User[]> {
        return await this.userService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id): Promise<UserDto> {
        return await this.userService.findOne(id);
    }

    @Post('registration')
    async registration(@Body() user: User): Promise<UserDto> {
        return await this.userService.registration(user);
    }

    // @Post('login')
    // async login(@Body() loginDto: LoginDto): Promise<UserDto> {
    //     console.log("EEEEEEEEEEEEE");
    //     return await this.userService.login(loginDto);
    // }

    @Post('changePhoto')
    @UseInterceptors(FileInterceptor('photo'))
    uploadSingleFileWithPost(@UploadedFile() photo, @Body() body): Promise<UserDto> {
        return this.userService.changePhoto(body.userId, photo);
    }

    @Post('pagination')
    async pagination(@Body() searchUser: SearchUser): Promise<UserPagination> {
        return await this.userService.pagination(searchUser);
    }

    @Post('pagination1')
    async pagination1(@Body() searchUser: SearchUserParamsDto): Promise<UserPagination> {
        return await this.userService.pagination1(searchUser);
    }

}
