import { ConflictException, Injectable } from '@nestjs/common'
import { UsersService } from 'src/modules/users/users.service'
import { JwtService } from '@nestjs/jwt'
import express from 'express'
import * as bcrypt from 'bcrypt'
import z from 'zod'
import { SignUpSchema } from 'src/common/schemas/auth.schema'
import { UserWithoutPassword } from 'src/common/interfaces/userInterfaces'
import { COOKIE_OPTIONS, REFRESH_TOKEN_COOKIE } from 'src/common/constants'
import { ConfigService } from '@nestjs/config'
import { JWT_REFRESH_TOKEN_EXPIRY_TIME } from './auth.constants'

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
        private configService: ConfigService,
    ) {}

    SERVICE: string = AuthService.name

    async validateUser(email: string, confirmPassword: string) {
        try {
            const user = await this.usersService.findByEmail(email)
            if (!user) return Promise.resolve(null)

            const { password, ...result } = user
            const isMatch = await bcrypt.compare(confirmPassword, password)
            if (!isMatch) return Promise.resolve(null)

            return result
        } catch (error) {
            return Promise.reject(error)
        }
    }

    async validateUserWithId(userId: string) {
        try {
            const user = await this.usersService.findUserById(userId)
            return user
        } catch (error) {
            return Promise.reject(error)
        }
    }

    async generateRefreshToken(
        userId: string,
        currentRefreshToken?: string,
        currentRefreshTokenExpiresAt?: Date,
    ) {
        const newRefreshToken = this.jwtService.sign(
            { sub: userId },
            {
                secret: this.configService.get('JWT_REFRESH_TOKEN_SECRET'),
                expiresIn: JWT_REFRESH_TOKEN_EXPIRY_TIME,
            },
        )

        if (currentRefreshToken && currentRefreshTokenExpiresAt) {
            await this.usersService.update({
                id: userId,
                refreshToken: newRefreshToken,
            })
        }

        return newRefreshToken
    }

    async generateTokenPair(
        user: UserWithoutPassword,
        res: express.Response,
        currentRefreshToken?: string,
        currentRefreshTokenExpiresAt?: Date,
    ) {
        const payload = {
            email: user.email,
            sub: user.id,
            role: user.role,
        }

        const refreshToken = await this.generateRefreshToken(
            user.id,
            currentRefreshToken,
            currentRefreshTokenExpiresAt,
        )

        await this.usersService.update({
            id: user.id,
            refreshToken,
        })

        res.cookie(REFRESH_TOKEN_COOKIE, refreshToken, {
            ...COOKIE_OPTIONS,
        })

        return { ...user, accessToken: this.jwtService.sign(payload) }
    }

    async signUp(data: z.infer<typeof SignUpSchema>) {
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

    async login(user: UserWithoutPassword, res: express.Response) {
        try {
            return await this.generateTokenPair(user, res)
        } catch (error) {
            return Promise.reject(error)
        }
    }

    async refreshToken(user: UserWithoutPassword, res: express.Response) {
        try {
            return this.generateTokenPair(user, res)
        } catch (error) {
            return Promise.reject(error)
        }
    }

    async logout(user: UserWithoutPassword, res: express.Response) {
        try {
            res.clearCookie(REFRESH_TOKEN_COOKIE)
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
