import {
    Body,
    Controller,
    Post,
    Req,
    Res,
    UnauthorizedException,
    UsePipes,
} from '@nestjs/common'
import { AuthService } from './auth.service'
import { Public } from 'src/common/helpers'
import { ZodValidationPipe } from 'src/common/validators/zodValidator'
import { LoginSchema, SignUpSchema } from 'src/common/schemas/auth.schema'
import z from 'zod'
import { REFRESH_TOKEN_COOKIE } from 'src/common/constants'
import express from 'express'

@Controller('auth')
export class AuthController {
    constructor(private service: AuthService) {}

    @Public()
    @Post('signin')
    @UsePipes(new ZodValidationPipe(LoginSchema))
    async login(
        @Req() req: express.Request,
        @Res({ passthrough: true }) response: express.Response,
    ) {
        console.log(req.user)
        const user = await this.service.login(req.body)
        const { refreshToken } = user
        response.cookie(REFRESH_TOKEN_COOKIE, refreshToken, { httpOnly: true })
        return user
    }

    @Post('refreshToken')
    async refresh(@Req() req: express.Request) {
        const { refreshToken } = req.cookies
        if (!refreshToken) {
            throw new UnauthorizedException('Refresh token not found')
        }

        return this.service.refreshToken(refreshToken)
    }

    @Post('logout')
    async logout(
        @Req() req: express.Request,
        @Res({ passthrough: true }) response: express.Response,
    ) {
        const { refreshToken } = req.cookies
        const loggedOut = await this.service.logout(refreshToken)
        if (loggedOut) {
            response.clearCookie(REFRESH_TOKEN_COOKIE)
        }

        return { loggedOut }
    }

    @Public()
    @Post('signup')
    @UsePipes(new ZodValidationPipe(SignUpSchema))
    async signUp(@Body() body: z.infer<typeof SignUpSchema>) {
        return await this.service.signUp(body)
    }
}
