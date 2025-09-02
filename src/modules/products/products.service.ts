import { Injectable } from '@nestjs/common'
import { ProductSchema } from 'src/common/schemas/product.schemas'
import z from 'zod'
import { PrismaService } from '../prisma/prisma.service'

@Injectable()
export class ProductsService {
    constructor(private prisma: PrismaService) {}

    async create(createProduct: z.infer<typeof ProductSchema>) {
        try {
            const createdProduct = await this.prisma.product.create({
                data: createProduct,
            })
            return createdProduct
        } catch (error) {
            return Promise.reject(error)
        }
    }

    async findAll() {
        try {
            const products = await this.prisma.product.findMany()
            return products
        } catch (error) {
            return Promise.reject(error)
        }
    }

    async findOne(id: string) {
        try {
            const product = await this.prisma.product.findUnique({
                where: { id },
            })
            return product
        } catch (error) {
            return Promise.reject(error)
        }
    }

    async update(id: string, updateProduct: z.infer<typeof ProductSchema>) {
        try {
            const updatedProduct = await this.prisma.product.update({
                where: { id },
                data: updateProduct,
            })
            return updatedProduct
        } catch (error) {
            return Promise.reject(error)
        }
    }

    async remove(id: string) {
        try {
            const deletedProduct = await this.prisma.product.delete({
                where: { id },
            })
            return deletedProduct
        } catch (error) {
            return Promise.reject(error)
        }
    }
}
