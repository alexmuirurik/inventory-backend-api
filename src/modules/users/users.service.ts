import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { User } from 'generated/prisma'
import z from 'zod'
import { SignUpSchema, UserSignUpSchema } from 'src/common/schemas/auth.schema'
import { UserWithoutPassword } from 'src/common/interfaces/userInterfaces'

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) {}

    async create(data: z.infer<typeof UserSignUpSchema>): Promise<User> {
        try {
            const user = await this.prisma.user.create({ data: data })
            return Promise.resolve(user)
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
                omit: { password: true },
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
            })

            return Promise.resolve(user)
        } catch (error) {
            return Promise.reject(error)
        }
    }

    async update(data: UserWithoutPassword) {
        try {
            const { id, ...userData } = data
            const user = await this.prisma.user.update({
                where: {
                    id: id,
                },
                data: userData,
                omit: { password: true },
            })

            return Promise.resolve(user)
        } catch (error) {
            return Promise.reject(error)
        }
    }
}
