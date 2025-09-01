import { Injectable, InternalServerErrorException } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) {}

    async findUserById(userId: string){
        try {
            const user = await this.prisma.user.findFirst({
                where: {
                    id: userId
                }
            })

            return Promise.resolve(user)
        } catch (error) {
            throw new InternalServerErrorException(error)
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
            throw new InternalServerErrorException(error)
        }
    }
}
