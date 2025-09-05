import { ConflictException, Injectable } from '@nestjs/common'
import { ProductSchema } from 'src/common/schemas/product.schemas'
import z from 'zod'
import { PrismaService } from '../prisma/prisma.service'
import { StockService } from '../stock/stock.service'
import { UserWithoutPassword } from 'src/common/interfaces/userInterfaces'

@Injectable()
export class ProductsService {
    constructor(
        private prisma: PrismaService,
        private stockService: StockService,
    ) {}

    async create(
        createProduct: z.infer<typeof ProductSchema>,
        user: UserWithoutPassword,
    ) {
        try {
            const { locationId, quantity, ...otherProduct } = createProduct
            const product = await this.prisma.product.findFirst({
                where: {
                    name: otherProduct.name,
                }
            })

            if(product) {
                throw new ConflictException('Product already exists')
            }

            let productCheckIn =
                await this.stockService.findCheckinByStatus('PENDING')

            if (!productCheckIn) {
                productCheckIn = await this.stockService.createCheckin({
                    userId: user.id,
                    locationId: createProduct.locationId,
                })
            }

            const createdProduct = await this.prisma.product.create({
                data: otherProduct,
            })

            const checkinItem = await this.stockService.createCheckinItem({
                productCheckinId: productCheckIn.id,
                productId: createdProduct.id,
                quantity: createProduct.quantity,
                costPrice: createProduct.costPrice,
            })

            const createStock = await this.prisma.stock.create({
                data: {
                    locationId: createProduct.locationId,
                    quantity: createProduct.quantity,
                    productId: createdProduct.id,
                },
            })

            return createdProduct
        } catch (error) {
            return Promise.reject(error)
        }
    }

    async createBulk(createProducts: z.infer<typeof ProductSchema>[]) {
        try {
            const createdProducts = await this.prisma.product.createMany({
                data: createProducts,
            })
            return createdProducts
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

    async findStockHistory(id: string) {
        try {
            const stockHistory = await this.prisma.productCheckinItem.findMany({
                where: { productId: id },
            })
            return stockHistory
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
