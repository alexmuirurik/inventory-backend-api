import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import z from 'zod'
import { StockSchema } from 'src/common/schemas/stock.schema'

@Injectable()
export class StockService {
    constructor(private prisma: PrismaService) {}

    async findAll() {
        return this.prisma.stock.findMany()
    }

    async create(data: z.infer<typeof StockSchema>) {
        return this.prisma.stock.create({
            data,
        })
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

    async remove(id: string) {
        return this.prisma.stock.delete({ where: { id } })
    }
}
