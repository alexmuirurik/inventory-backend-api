import { Injectable, Logger, NotFoundException } from '@nestjs/common'
import { UsersService } from 'src/modules/users/users.service'
import { JwtService } from '@nestjs/jwt'
import { ConfigService } from '@nestjs/config'
import { User } from 'generated/prisma'
import { COOKIE_OPTIONS, REFRESH_TOKEN_COOKIE } from 'src/common/constants'
import * as bcrypt from 'bcrypt'
import { JWT_REFRESH_TOKEN_EXPIRY_TIME } from './auth.constants'

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
        private configService: ConfigService,
        private readonly logger: Logger,
    ) {}

    SERVICE: string = AuthService.name

    async validateUser(email: string, password: string): Promise<User | null> {
        const user = await this.usersService.findByEmail(email)
        if (!user) throw new NotFoundException()

        if (user) {
            const isMatch = await bcrypt.compare(password, user.password)
            if (isMatch) {
                return user
            }
        }
        return null
    }

    async validateUserWithId(userId: string) {
        const users = [
            {
                email: 'content@alexmuiruri.com',
                name: 'Alex Muiruri',
                userId: 'alexmuirurik',
            },
        ]
        const user = users.find((user) => user.userId === userId)
        return user ?? null
    }

    async generateRefreshToken(userId: string) {
        const newRefreshToken = this.jwtService.sign(
            { sub: userId },
            {
                secret: this.configService.get('JWT_REFRESH_TOKEN_SECRET'),
                expiresIn: JWT_REFRESH_TOKEN_EXPIRY_TIME,
            },
        )

        return newRefreshToken
    }

    async generateTokenPair(
        user: User,
        res: any,
    ): Promise<{ accessToken: string }> {
        const payload = {
            email: user.email,
            sub: user.id,
        }

        const refreshToken = await this.generateRefreshToken(user.id)

        res.cookie(REFRESH_TOKEN_COOKIE, refreshToken, {
            ...COOKIE_OPTIONS,
        })

        return {
            accessToken: this.jwtService.sign(payload),
        }
    }

    async login(user: User, res: Response): Promise<any> {
        const result = await this.generateTokenPair(user, res)
        this.logger.log(this.SERVICE, {
            event: 'Login',
            userId: user.id,
            source: this.SERVICE,
        })
        return result
    }
}
