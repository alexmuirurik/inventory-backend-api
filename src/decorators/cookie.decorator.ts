import { createParamDecorator } from '@nestjs/common'
import { ExecutionContext } from '@nestjs/common'
import { REFRESH_TOKEN_COOKIE } from 'src/common/constants'

export const CookieJwt = createParamDecorator(
    (_: unknown, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest()
        const token = request.cookies[REFRESH_TOKEN_COOKIE]
        return token
    },
)
