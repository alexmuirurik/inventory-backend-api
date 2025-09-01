import { Body, Controller, Post, Res, UsePipes } from '@nestjs/common'
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
        @Body() body: z.infer<typeof LoginSchema>,
        @Res({ passthrough: true }) response: express.Response,
    ) {
        const user = await this.service.login(body)
        const { refreshToken } = user
        response.cookie(REFRESH_TOKEN_COOKIE, refreshToken, { httpOnly: true })
        return user
    }

    @Public()
    @Post('refreshToken')
    async refresh() {
        console.log('here')
        return {
            accessToken: 'klkl',
        }
    }

    @Post('logout')
    async logout(@Body('refreshToken') refreshToken: string) {
        return await this.service.logout(refreshToken)
    }

    @Public()
    @Post('signup')
    @UsePipes(new ZodValidationPipe(SignUpSchema))
    async signUp(@Body() body: z.infer<typeof SignUpSchema>) {
        return await this.service.signUp(body)
    }
}
