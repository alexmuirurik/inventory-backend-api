import {
    Body,
    Controller,
    Post,
    Req,
    Res,
    UnauthorizedException,
    UseGuards,
    UsePipes,
} from '@nestjs/common'
import { AuthService } from './auth.service'
import { Public } from 'src/common/helpers'
import { ZodValidationPipe } from 'src/common/validators/zodValidator'
import { LoginSchema, SignUpSchema } from 'src/common/schemas/auth.schema'
import z from 'zod'
import express from 'express'
import { LocalAuthGuard } from './guards/local-auth.guard'
import { UserWithoutPassword } from 'src/common/interfaces/userInterfaces'
import { JWTRefreshGuard } from './guards/jwt-refresh.guard'

@Controller('auth')
export class AuthController {
    constructor(private service: AuthService) {}

    @Public()
    @Post('signup')
    @UsePipes(new ZodValidationPipe(SignUpSchema))
    async signUp(@Body() body: z.infer<typeof SignUpSchema>) {
        return await this.service.signUp(body)
    }

    @Public()
    @UseGuards(LocalAuthGuard) 
    @UsePipes(new ZodValidationPipe(LoginSchema))
    @Post('signin')
    async login(
        @Req() req: express.Request,
        @Res({ passthrough: true }) response: express.Response,
    ) {
        return await this.service.login(req.user as UserWithoutPassword, response)
    }

    @Public()
    @UseGuards(JWTRefreshGuard)
    @Post('refreshToken')
    async refresh(@Req() req: express.Request, @Res({ passthrough: true }) response: express.Response) {
        return this.service.refreshToken(req.user as UserWithoutPassword, response)
    }

    @Post('logout')
    async logout(
        @Req() req: express.Request,
        @Res({ passthrough: true }) response: express.Response,
    ) {
        const loggedOut = await this.service.logout(
            req.user as UserWithoutPassword,
            response
        )
        return { loggedOut }
    }
}
