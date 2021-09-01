import { Body, Controller, Get, Post } from '@nestjs/common';
import { LoginDto } from 'src/dto/LoginDto';
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

    @Post('registration')
    async registration(@Body() user: User): Promise<User> {
        return await this.userService.registration(user);
    }

    @Post('login')
    async login(@Body() loginDto: LoginDto): Promise<User> {
        return await this.userService.login(loginDto);
    }

}
