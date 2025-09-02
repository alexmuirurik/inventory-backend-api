import { Injectable } from '@nestjs/common'
import { SaleItemSchema } from 'src/common/schemas/sales.schema'
import z from 'zod'
import { PrismaService } from '../prisma/prisma.service'

@Injectable()
export class SalesService {
    constructor(private readonly prisma: PrismaService) {}

    async create(createSaleDto: z.infer<typeof SaleItemSchema>) {
        try {
            const sale = await this.prisma.sale.create({
                data: createSaleDto,
            })
            return sale
        } catch (error) {
            return Promise.reject(error)
        }
    }

    async findAll() {
        try {
            const sales = await this.prisma.sale.findMany()
            return sales
        } catch (error) {
            return Promise.reject(error)
        }
    }

    async findOne(id: string) {
        try {
            const sale = await this.prisma.sale.findUnique({
                where: { id },
            })
            return sale
        } catch (error) {
            return Promise.reject(error)
        }
    }

    async update(id: string, updateSaleDto: z.infer<typeof SaleItemSchema>) {
        try {
            const sale = await this.prisma.sale.update({
                where: { id },
                data: updateSaleDto,
            })
            return sale
        } catch (error) {
            return Promise.reject(error)
        }
    }

    async remove(id: string) {
        try {
            const sale = await this.prisma.sale.delete({
                where: { id },
            })
            return sale
        } catch (error) {
            return Promise.reject(error)
        }
    }
}
