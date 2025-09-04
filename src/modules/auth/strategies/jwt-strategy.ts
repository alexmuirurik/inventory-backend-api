import { ExtractJwt, Strategy } from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'
import { ForbiddenException, Injectable } from '@nestjs/common'
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
            passReqToCallback: true
        })
    }

    async validate(payload: any) {
        try {
            const user = await this.authService.validateUserWithId(payload.sub)
            if (!user || !user.refreshToken) {
                throw new ForbiddenException('Access denied')
            }

            return Promise.resolve(user)
        } catch (error) {
            return Promise.reject(error)
        }
    }
}
