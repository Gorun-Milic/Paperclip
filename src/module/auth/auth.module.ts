import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from 'src/auth-strategy/jwt/jwt.strategy';
import { LocalStrategy } from 'src/auth-strategy/local/local.strategy';
import { AuthController } from 'src/controller/auth/auth.controller';
import { LocalAuthGuard } from 'src/guards/local-auth.guard';
import { AuthService } from 'src/service/auth/auth.service';
import { UserModule } from '../user/user/user.module';

@Module({
    imports: [UserModule, JwtModule.register(
        {
            secret: 'BLABLA',
            signOptions: { expiresIn: '3600s'}
        }
    )],
    controllers: [AuthController],
    providers: [AuthService, LocalStrategy, JwtStrategy],
    exports: [AuthService]
})
export class AuthModule {}
