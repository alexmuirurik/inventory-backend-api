import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { User } from 'generated/prisma'
import z from 'zod'
import { UserSignUpSchema } from 'src/common/schemas/auth.schema'
import { UserWithoutPassword } from 'src/common/interfaces/userInterfaces'

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) {}

    async create(data: z.infer<typeof UserSignUpSchema>) {
        try {
            const user = await this.prisma.user.create({
                data: data,
                omit: {
                    password: true,
                    refreshToken: true,
                },
            })
            return Promise.resolve(user)
        } catch (error) {
            return Promise.reject(error)
        }
    }

    async findAll(criteria?: Partial<User>) {
        try {
            const users = await this.prisma.user.findMany({
                where: criteria,
                omit: {
                    password: true,
                    refreshToken: true,
                },
            })
            return Promise.resolve(users)
        } catch (error) {
            return Promise.reject(error)
        }
    }

    async findUserById(userId: string) {
        try {
            const user = await this.prisma.user.findFirst({
                where: {
                    id: userId,
                },
                omit: {
                    password: true,
                },
            })

            return Promise.resolve(user)
        } catch (error) {
            return Promise.reject(error)
        }
    }

    async findByEmail(email: string) {
        try {
            const user = await this.prisma.user.findFirst({
                where: {
                    email: email,
                },
                omit: {
                    refreshToken: true,
                }
            })

            return Promise.resolve(user)
        } catch (error) {
            return Promise.reject(error)
        }
    }

    async update(data: Partial<UserWithoutPassword>) {
        try {
            const { id, ...userData } = data
            const user = await this.prisma.user.update({
                where: {
                    id: id,
                },
                data: userData,
                omit: {
                    password: true,
                    refreshToken: true,
                },
            })

            return Promise.resolve(user)
        } catch (error) {
            return Promise.reject(error)
        }
    }

    async deleteUserById(userId: string) {
        try {
            const deleted = await this.prisma.user.delete({
                where: {
                    id: userId,
                },
            })

            if (!deleted) {
                return Promise.resolve({ message: 'User not found' })
            }

            return Promise.resolve({ message: 'User deleted successfully' })
        } catch (error) {
            return Promise.reject(error)
        }
    }
}
