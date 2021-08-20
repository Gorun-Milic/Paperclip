import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LoginDto } from 'src/dto/LoginDto';
import { User } from 'src/entity/user';
import { ExceptionMessageEnum } from 'src/globals/ExceptionMessageEnum.enum';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UserService {

    crypto = require('crypto');

    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        private configService: ConfigService
    ) {}

    findAll(): Promise<User[]> {
        return this.userRepository.find();
    }
    
    findOne(id: string): Promise<User> {
    return this.userRepository.findOne(id);
    }
    
    async remove(id: string): Promise<void> {
    await this.userRepository.delete(id);
    }

    async registration(user: User): Promise<User> {
        let userEntity = await this.userRepository.findOne({
          email: user.email,
        });
        if (userEntity) {
          throw new HttpException(
            ExceptionMessageEnum.USER_EXIST,
            HttpStatus.BAD_REQUEST,
          );
        }
        userEntity.password = this.encrypte(user.password);
        return userEntity = await this.userRepository.save(userEntity);
    }
    
    async login(loginUserDto: LoginDto): Promise<User> {
        let userEntity = await this.userRepository.findOne({
            email: loginUserDto.email,
        });
        if (!userEntity) {
            throw new HttpException(
            ExceptionMessageEnum.USER_WRONG_CREDENTIALS,
            HttpStatus.BAD_REQUEST,
            );
        }
        if (this.decrypte(userEntity.password) === loginUserDto.password) {
            return userEntity;
        } else {
            throw new HttpException(
            ExceptionMessageEnum.USER_WRONG_CREDENTIALS,
            HttpStatus.BAD_REQUEST,
            );
        }
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
