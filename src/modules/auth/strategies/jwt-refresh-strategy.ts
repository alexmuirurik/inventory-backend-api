import { ExtractJwt, Strategy } from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'
import { ForbiddenException, Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Request } from 'express'

import { AuthService } from '../auth.service'
import { REFRESH_TOKEN_COOKIE } from 'src/common/constants'

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
            secretOrKey: configService.getOrThrow('JWT_ACCESS_TOKEN_SECRET'),
        })
    }

    async validate(payload: any, req: Request) {
        try {
            const user = await this.authService.validateUserWithId(payload.sub)
            if (!user?.refreshToken) {
                throw new ForbiddenException('Access denied')
            }

            return Promise.resolve(user)
        } catch (error) {
            return Promise.reject(error)
        }
    }
}

function extractRefreshTokenFromCookies(req: Request): string {
    const token = req.cookies[REFRESH_TOKEN_COOKIE]
    return token
}
