import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { User } from 'generated/prisma'

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) {}

    async findByEmail(email: string) {
        const users = [
            {
                email: 'dsdssd',
                password: 'dsdsds',
            },
        ]
        const user = users.find((user) => user.email === email)

        return (user as User) ?? null
    }
}
