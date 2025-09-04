import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import z from 'zod'
import { StoreLocationSchema } from 'src/common/schemas/store.schema'

@Injectable()
export class BusinessService {
    constructor(private prisma: PrismaService) {}

    async createBusinessLocation(data: z.infer<typeof StoreLocationSchema>) {
        return this.prisma.storeLocation.create({
            data,
        })
    }
}
