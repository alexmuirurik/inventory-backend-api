import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import z from 'zod'
import {
    ProductCheckinItemSchema,
    ProductCheckInSchema,
    StockSchema,
} from 'src/common/schemas/stock.schema'

@Injectable()
export class StockService {
    constructor(private prisma: PrismaService) {}

    async create(data: z.infer<typeof ProductCheckInSchema>) {
        return this.prisma.productCheckIn.create({
            data,
        })
    }


    async findAll() {
        return this.prisma.stock.findMany()
    }

    async findByStatus(status: string) {
        return this.prisma.productCheckIn.findMany()
    }

    async findOne(id: string) {
        return this.prisma.stock.findUnique({
            where: {
                id,
            },
        })
    }

    async update(data: z.infer<typeof StockSchema>) {
        return this.prisma.stock.update({
            where: {
                id: data.id,
            },
            data,
        })
    }

    async closeSession(id: string) {
        return this.prisma.productCheckIn.update({
            where: {
                id,
            },
            data: {
                status: 'RECEIVED'
            }
        })
    }

    async remove(id: string) {
        return this.prisma.stock.delete({ where: { id } })
    }
}
