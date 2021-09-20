import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UserService } from "src/service/user/user/user.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

    constructor(
        private userService: UserService
    ) {
        super(
            {
                jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
                ignoreExpiration: false,
                secretOrKey: 'BLABLA'
            }
        );
    }

    async validate(payload: any) {
        let user = await this.userService.findOne(payload.sub);
        if (user) {
            return user;
        }else {
            throw new UnauthorizedException();
        }
    }

}