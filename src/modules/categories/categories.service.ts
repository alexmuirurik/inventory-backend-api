import { Injectable } from '@nestjs/common'
import { CategorySchema } from 'src/common/schemas/category.schema'
import z from 'zod'
import { PrismaService } from '../prisma/prisma.service'

@Injectable()
export class CategoriesService {
    constructor(private prisma: PrismaService) {}

    async create(createCategory: z.infer<typeof CategorySchema>) {
        try {
            const newCategory = await this.prisma.productCategory.create({
                data: createCategory,
            })
            return newCategory
        } catch (error) {
            return Promise.reject(error)
        }
    }

    async findAll() {
        try {
            const categories = await this.prisma.productCategory.findMany()
            return categories
        } catch (error) {
            return Promise.reject(error)
        }
    }

    async findOne(id: string) {
        try {
            const category = await this.prisma.productCategory.findUnique({
                where: {
                    id,
                },
            })
            return category
        } catch (error) {
            return Promise.reject(error)
        }
    }

    async update(updateCategory: z.infer<typeof CategorySchema>) {
        try {
            const updatedCategory = await this.prisma.productCategory.update({
                where: {
                    id: updateCategory.id,
                },
                data: updateCategory,
            })
            return updatedCategory
        } catch (error) {
            return Promise.reject(error)
        }
    }

    async remove(id: string) {
        try {
            await this.prisma.productCategory.delete({
                where: {
                    id,
                },
            })
            return { message: `Category with id ${id} removed successfully` }
        } catch (error) {
            return Promise.reject(error)
        }
    }
}
