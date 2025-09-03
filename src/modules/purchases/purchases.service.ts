import { Injectable } from '@nestjs/common'
import {
    ProductCheckinItemSchema,
    ProductCheckInSchema,
} from 'src/common/schemas/stock.schema'
import z from 'zod'
import { PrismaService } from '../prisma/prisma.service'

@Injectable()
export class PurchasesService {
    constructor(private readonly prisma: PrismaService) {}
    async create(createPurchase: z.infer<typeof ProductCheckInSchema>) {
        try {
            const purchase = await this.prisma.productCheckIn.create({
                data: createPurchase,
            })
            return purchase
        } catch (error) {
            throw new Error('Error creating purchase')
        }
    }

    async findAll() {
        try {
            const purchases = await this.prisma.productCheckIn.findMany()
            return purchases
        } catch (error) {
            throw new Error('Error fetching all purchases')
        }
    }

    async findOne(id: string) {
        try {
            const purchase = await this.prisma.productCheckIn.findUnique({
                where: { id },
            })
            return purchase
        } catch (error) {
            throw new Error('Error fetching purchase')
        }
    }

    async update(
        id: string,
        updatePurchase: z.infer<typeof ProductCheckInSchema>,
    ) {
        try {
            const purchase = await this.prisma.productCheckIn.update({
                where: { id },
                data: updatePurchase,
            })
            return purchase
        } catch (error) {
            throw new Error('Error updating purchase')
        }
    }

    async remove(id: string) {
        try {
            await this.prisma.productCheckIn.delete({
                where: { id },
            })
            return { message: 'Purchase removed successfully' }
        } catch (error) {
            throw new Error('Error removing purchase')
        }
    }
}
