import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import z from 'zod'
import { StoreLocationSchema } from 'src/common/schemas/store.schema'
import { UserWithoutPassword } from 'src/common/interfaces/userInterfaces'

@Injectable()
export class BusinessService {
    constructor(private prisma: PrismaService) {}

    async createBusinessLocation(data: z.infer<typeof StoreLocationSchema>) {
        return this.prisma.storeLocation.create({
            data,
        })
    }

    async getBusinessLocations(user: UserWithoutPassword) {
        try {
            const business = await this.prisma.business.findFirst({
                where: {
                    userId: user.id,
                },
                include: {
                    StoreLocation: true,
                },
            })

            return Promise.resolve(business)
        } catch (error) {
            return Promise.reject(error)
        }
    }
}
