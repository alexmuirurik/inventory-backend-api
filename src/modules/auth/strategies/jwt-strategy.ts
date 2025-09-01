import { ExtractJwt, Strategy} from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { AuthService } from '../auth.service'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor( 
        private authService: AuthService,
        configService: ConfigService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.getOrThrow('JWT_ACCESS_TOKEN_SECRET'),
        })
    }

    async validate(payload: any) {
        const user = await this.authService.validateUserWithId(payload.sub)
        return user
    }
}
