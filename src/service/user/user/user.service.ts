import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { LoginDto } from 'src/dto/LoginDto';
import { SearchUser } from 'src/dto/SearchUser';
import { UserDto } from 'src/dto/UserDto';
import { UserPagination } from 'src/dto/UserPagination';
import { User } from 'src/entity/user';
import { ExceptionMessageEnum } from 'src/globals/ExceptionMessageEnum.enum';
import { userMapper } from 'src/globals/functions/userMapper';
import { Like, Not, Repository } from 'typeorm';
import { userArrayMapper } from 'src/globals/functions/userArrayMapper';
import { SearchUserParamsDto } from 'src/dto/SearchUserParamsDto';

@Injectable()
export class UserService {

    crypto = require('crypto');

    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        private configService: ConfigService,
    ) {}

    findAll(): Promise<User[]> {
        return this.userRepository.find();
    }
    
    async findOne(id: string): Promise<UserDto> {
        let userEntity = await this.userRepository.findOne({
            where: {
                id: id
            },
            relations: ['city']
        });
        if (!userEntity) {
            throw new HttpException(
                ExceptionMessageEnum.USER_NOT_FOUND,
                HttpStatus.BAD_REQUEST
            );
        }
        return userMapper(userEntity);
    }
    
    async remove(id: string): Promise<void> {
        await this.userRepository.delete(id);
    }

    async registration(user: User): Promise<UserDto> {
        console.log(user);
        
        let userEntity = await this.userRepository.findOne(
            {
                where: {
                    email: user.email
                },
                relations: ['city', 'city.country'],
            }
        );
        if (userEntity) {
          throw new HttpException(
            ExceptionMessageEnum.USER_EXIST,
            HttpStatus.BAD_REQUEST,
          );
        }
        user.password = this.encrypte(user.password);
        userEntity = await this.userRepository.save(user);
        return userMapper(userEntity);
    }

    async findByEmail(email: string): Promise<any> {
        let userEntity = await this.userRepository.findOne({
            where: {
                email: email,
            },
            relations: ['city', 'city.country']
        });
        if (userEntity) {
            return userMapper(userEntity);
        }
    }
    

    async changePhoto(userId: string, photo): Promise<UserDto> {
        console.log("Stigao ovde 1");
        let userEntity =  await this.userRepository.findOne({
            where: {
                id: userId
            },
            relations: ['city']
        });
        if (!userEntity) {
            console.log("Stigao ovde 2");
            throw new HttpException(
            ExceptionMessageEnum.USER_NOT_FOUND,
            HttpStatus.BAD_REQUEST,
            );
        }
        if (photo) {
            console.log("Stigao ovde 3");
            userEntity.photo = photo.buffer;
        }
        userEntity = await this.userRepository.save(userEntity);
        console.log("Stigao ovde 4");
        return userMapper(userEntity);
    }

    async pagination(searchUser: SearchUser): Promise<UserPagination> { 
        const skip = searchUser.pageSize * (searchUser.currentPage-1);

        let whereArray = [];

        let searchName = {};
        if (searchUser.name!=="") {
            searchName = {
                firstName: Like('%' + searchUser.name + "%")
            }
            whereArray.push(searchName);
        }

        let searchCountry = {};
        if (searchUser.country!=="") {
            searchCountry = {
                country: Like('%' + searchUser.country + "%")
            }
            whereArray.push(searchCountry);
        }

        let searchCity = {};
        if (searchUser.city!=="") {
            searchCity = {
                city: Like('%' + searchUser.city + "%")
            }
            whereArray.push(searchCity);
        }

        const [result, total] = await this.userRepository.findAndCount({
            where: whereArray,
            take: searchUser.pageSize,
            skip: skip
        });

        let userArray: UserDto[] = userArrayMapper(result);

        return {
            users: userArray,
            total: total
        };
    }

    async pagination1(searchUser: SearchUserParamsDto): Promise<UserPagination> { 

        console.log(searchUser);
        const skip = searchUser.pageSize * (searchUser.currentPage-1);

        let whereCondition;

        if (searchUser.countryName==='All') {
            whereCondition = [
            {
                firstName: Like('%' + searchUser.name + "%"),
                role: Not("admin")
            },
            {
                lastName: Like('%' + searchUser.name + "%"),
                role: Not("admin")
            },
            ]
        }else {
            console.log("Ovde smo");
            whereCondition = [
                {
                    firstName: Like('%' + searchUser.name + "%"),
                    city: {
                        country: {
                            name: Like('%' + searchUser.countryName + "%")
                        }
                    },
                    role: Not("admin")
                },
                {
                    lastName: Like('%' + searchUser.name + "%"),
                    city: {
                        country: {
                            name: Like('%' + searchUser.countryName + "%")
                        }
                    },
                    role: Not("admin")
                },
            ]
        }

        const [result, total] = await this.userRepository.findAndCount({
            where: whereCondition,
            take: searchUser.pageSize,
            skip: skip,
            relations: ['city']
        });

        let userArray: UserDto[] = userArrayMapper(result);

        return {
            users: userArray,
            total: total
        };

    }

    encrypte(password: string): string {
        const key = this.configService.get<string>('SECRET_KEY');
        let cipher = this.crypto.createCipher('aes-256-cbc', key);
        let encrypted = cipher.update(password, 'utf8', 'hex');
        encrypted += cipher.final('hex');
        return encrypted;
      }
    
    decrypte(hashedPassword: string): string {
        const key = this.configService.get<string>('SECRET_KEY');
        let decipher = this.crypto.createDecipher('aes-256-cbc', key);
        let decrypted = decipher.update(hashedPassword, 'hex', 'utf8');
        decrypted += decipher.final('utf8');
        return decrypted;
    }

}


