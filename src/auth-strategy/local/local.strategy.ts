import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { UserDto } from "src/dto/UserDto";
import { AuthService } from "src/service/auth/auth.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {

    constructor(private authService: AuthService) {
        super();
    }

    async validate(email: string, password: string): Promise<any> {

        let user = await this.authService.validateUser(email, password);

        if (!user) {
            throw new UnauthorizedException();
        }
        return user;
    }

}