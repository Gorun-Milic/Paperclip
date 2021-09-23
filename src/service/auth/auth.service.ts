import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user/user.service';

@Injectable()
export class AuthService {

    crypto = require('crypto');

    constructor(
        private userService: UserService,
        private configService: ConfigService,
        private jwtService: JwtService){}

    async validateUser(email: string, password: string): Promise<any> {
        let user = await this.userService.findByEmail(email);

        if (user && user.password===this.encrypte(password)) {
            return user;
        }else {
            console.log('Wrong password');
        }
    }

    async login(user) {
        const payload = {firstName: user.firstName, sub: user.id};

        return {
            access_token: this.jwtService.sign(payload)
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
