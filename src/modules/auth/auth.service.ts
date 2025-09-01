import {
    ConflictException,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common'
import { UsersService } from 'src/modules/users/users.service'
import { JwtService } from '@nestjs/jwt'
import { ConfigService } from '@nestjs/config'
import { User } from 'generated/prisma'
import * as bcrypt from 'bcrypt'
import { JWT_REFRESH_TOKEN_EXPIRY_TIME } from './auth.constants'
import z from 'zod'
import { LoginSchema, SignUpSchema } from 'src/common/schemas/auth.schema'
import { UserWithoutPassword } from 'src/common/interfaces/userInterfaces'

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
        private configService: ConfigService,
    ) {}

    SERVICE: string = AuthService.name

    async validateUser(
        email: string,
        confirmPassword: string,
    ): Promise<UserWithoutPassword> {
        try {
            const user = await this.usersService.findByEmail(email)
            if (!user) throw new UnauthorizedException('User Not Found')

            const { password, ...result } = user
            const isMatch = await bcrypt.compare(confirmPassword, password)
            if (!isMatch) throw new UnauthorizedException('Invalid credentials')

            return result
        } catch (error) {
            return Promise.reject(error)
        }
    }

    async validateUserWithId(userId: string) {
        try {
            const user = await this.usersService.findUserById(userId)
            if (!user) throw new UnauthorizedException('User Not Found')
            return user
        } catch (error) {
            return Promise.reject(error)
        }
    }

    async generateTokenPair(
        user: UserWithoutPassword,
    ): Promise<UserWithoutPassword> {
        try {
            const updateUserToken = await this.usersService.update({
                ...user,
                refreshToken: this.jwtService.sign(
                    { sub: user.id },
                    {
                        secret: this.configService.get(
                            'JWT_REFRESH_TOKEN_SECRET',
                        ),
                        expiresIn: JWT_REFRESH_TOKEN_EXPIRY_TIME,
                    },
                ),
            })

            if (!updateUserToken || !updateUserToken.refreshToken)
                throw new UnauthorizedException('Invalid user')

            return updateUserToken
        } catch (error) {
            return Promise.reject(error)
        }
    }

    async signUp(data: z.infer<typeof SignUpSchema>): Promise<any> {
        try {
            const userExists = await this.usersService.findByEmail(data.email)
            if (userExists) throw new ConflictException('User already exists')

            const hashPassword = await bcrypt.hash(data.password, 10)
            const { confirmPassword, ...userData } = data
            const user = await this.usersService.create({
                ...userData,
                password: hashPassword,
            })
            return user
        } catch (error) {
            return Promise.reject(error)
        }
    }

    async login(
        data: z.infer<typeof LoginSchema>,
    ): Promise<UserWithoutPassword> {
        try {
            const user = await this.validateUser(data.email, data.password)
            const result = await this.generateTokenPair(user)
            return result
        } catch (error) {
            return Promise.reject(error)
        }
    }

    async refreshToken(refreshToken: string) {
        try {
            const payload = this.jwtService.verify(refreshToken, {
                secret: this.configService.get('JWT_REFRESH_TOKEN_SECRET'),
            })

            const user = await this.validateUserWithId(payload.sub)
            const result = await this.generateTokenPair(user)
            return result
        } catch (error) {
            return Promise.reject(error)
        }
    }

    async logout(refreshToken: string) {
        try {
            const payload = this.jwtService.verify(refreshToken, {
                secret: this.configService.get('JWT_REFRESH_TOKEN_SECRET'),
            })

            const user = await this.validateUserWithId(payload.sub)
            if (!user) throw new UnauthorizedException('User Not Found')

            const loggedOut = await this.usersService.update({
                ...user,
                refreshToken: null,
            })

            return !!loggedOut
        } catch (error) {
            return Promise.reject(error)
        }
    }
}
