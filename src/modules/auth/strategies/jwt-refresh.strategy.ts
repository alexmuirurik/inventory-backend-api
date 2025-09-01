import { ExtractJwt, Strategy } from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Request } from 'express'
import { AuthService } from '../auth.service'
import { REFRESH_TOKEN_COOKIE } from 'src/common/constants'
import { EXCEPTIONS } from '../auth.constants'

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
    Strategy,
    'jwt-refresh',
) {
    constructor(
        private authService: AuthService,
        configService: ConfigService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
                (req: Request) => extractRefreshTokenFromCookies(req),
            ]),
            ignoreExpiration: false,
            secretOrKey: configService.getOrThrow('JWT_REFRESH_TOKEN_SECRET'),
        })
    }

    async validate(payload: { sub: string; exp: number }) {
        const user = await this.authService.validateUserWithId(payload.sub)
        if (!user) {
            throw new UnauthorizedException(
                EXCEPTIONS.invalidRefreshToken.description,
            )
        }
        
        return {
            user,
            refreshTokenExpiresAt: new Date(payload.exp * 1000),
        }
    }
}

const extractRefreshTokenFromCookies = (req: Request): string => {
    const token = req.cookies[REFRESH_TOKEN_COOKIE]
    return token
}
