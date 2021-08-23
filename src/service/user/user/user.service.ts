import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { LoginDto } from 'src/dto/LoginDto';
import { User } from 'src/entity/user';
import { ExceptionMessageEnum } from 'src/globals/ExceptionMessageEnum.enum';
import { Repository } from 'typeorm';

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
    
    findOne(id: string): Promise<User> {
        return this.userRepository.findOne(id);
    }
    
    async remove(id: string): Promise<void> {
        await this.userRepository.delete(id);
    }

    async registration(user: User): Promise<User> {
        console.log("Dosao ovde!");
        let userEntity = await this.userRepository.findOne({
          email: user.email,
        });
        if (userEntity) {
          throw new HttpException(
            ExceptionMessageEnum.USER_EXIST,
            HttpStatus.BAD_REQUEST,
          );
        }
        user.password = this.encrypte(user.password);
        //dodam prvo adresu u bazu (sada pokusavam da dodam usera, a user ima strani kljuc idadress. Moram da mu dodelim neki od kljuceva koji postoje u tabeli address. Tako da jedno resenje je da dodam prvo adresu u address tabelu, a onda dodam usera u user tabelu i postavim mu adress)
        //kako ne bih mesao module i service mislim da je najvolje da adresa ne bude zasebna tabela vec polja iz usera
        return user = await this.userRepository.save(user);
    }
    
    async login(loginUserDto: LoginDto): Promise<User> {
        let userEntity = await this.userRepository.findOne({
            email: loginUserDto.email,
        });
        if (!userEntity) {
            console.log('Ne postoji!');
            throw new HttpException(
            ExceptionMessageEnum.USER_WRONG_CREDENTIALS,
            HttpStatus.BAD_REQUEST,
            );
        }
        if (this.decrypte(userEntity.password) === loginUserDto.password) {
            return userEntity;
        } else {
            console.log('Losa siifra!');
            throw new HttpException(
            ExceptionMessageEnum.USER_WRONG_CREDENTIALS,
            HttpStatus.BAD_REQUEST,
            );
        }
    }

    encrypte(password: string): string {
        const key = this.configService.get<string>('SECRET_KEY');
        // const key = 'ovajsvetjelud';
        let cipher = this.crypto.createCipher('aes-256-cbc', key);
        let encrypted = cipher.update(password, 'utf8', 'hex');
        encrypted += cipher.final('hex');
        return encrypted;
      }
    
    decrypte(hashedPassword: string): string {
        const key = this.configService.get<string>('SECRET_KEY');
        // const key = 'ovajsvetjelud';
        let decipher = this.crypto.createDecipher('aes-256-cbc', key);
        let decrypted = decipher.update(hashedPassword, 'hex', 'utf8');
        decrypted += decipher.final('utf8');
        return decrypted;
    }

}
