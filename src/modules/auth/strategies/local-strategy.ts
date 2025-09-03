import { Strategy } from 'passport-local'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { AuthService } from '../auth.service'

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly authService: AuthService) {
        super({ usernameField: 'email', passwordField: 'password' })
    }

    async validate(email: string, password: string) {
        try {
            const user = await this.authService.validateUser(email, password)
            if (!user) {
                throw new UnauthorizedException('Invalid credentials')
            }
            return Promise.resolve(user)
        } catch (error) {
            return Promise.reject(error)
        }
    }
}
