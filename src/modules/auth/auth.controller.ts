import { Body, Controller, Get, Post, Res, UsePipes } from '@nestjs/common'
import { AuthService } from './auth.service'
import { Public } from 'src/common/helpers'
import { ZodValidationPipe } from 'src/common/validators/zodValidator'
import { LoginSchema } from 'src/common/schemas/auth.schema'

@Controller('auth')
export class AuthController {
    constructor(private service: AuthService) {}

    @Public()
    @UsePipes(new ZodValidationPipe(LoginSchema))
    @Post('signin')
    async login(@Res() res: Response,  @Body() body: any) {
        return this.service.login(body, res)
    }
}
