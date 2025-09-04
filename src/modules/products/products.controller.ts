import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    UsePipes,
    Req,
} from '@nestjs/common'
import { ProductsService } from './products.service'
import z from 'zod'
import { IdSchema, ProductSchema } from 'src/common/schemas/product.schemas'
import { ZodValidationPipe } from 'src/common/validators/zodValidator'
import express from 'express'
import { UserWithoutPassword } from 'src/common/interfaces/userInterfaces'

@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) {}

    @Get()
    findAll() {
        return this.productsService.findAll()
    }

    /**
     * Ways to add products
     * 1. Adding each product manually - create productcheckin for the entire day
     * 2. Adding validated products by bulk
     * 3. Adding or removing stock for each product manually
     * 4.
     *
     **/
    @Post()
    @UsePipes(new ZodValidationPipe(ProductSchema))
    create(
        @Body() createProductDto: z.infer<typeof ProductSchema>,
        @Req() req: express.Request,
    ) {
        return this.productsService.create(
            createProductDto,
            req.user as UserWithoutPassword,
        )
    }

    @Post('bulk')
    @UsePipes(new ZodValidationPipe(z.array(ProductSchema)))
    createBulk(@Body() createProductDtos: z.infer<typeof ProductSchema>[]) {
        return this.productsService.createBulk(createProductDtos)
    }

    @Get('/stock-history/:id')
    @UsePipes(new ZodValidationPipe(IdSchema))
    findStockHistory(@Param('id') id: string) {
        return this.productsService.findStockHistory(id)
    }

    @Get(':id')
    @UsePipes(new ZodValidationPipe(IdSchema))
    findOne(@Param('id') id: string) {
        return this.productsService.findOne(id)
    }

    @Patch(':id')
    @UsePipes(new ZodValidationPipe(ProductSchema))
    update(
        @Param('id') id: string,
        @Body() updateProductDto: z.infer<typeof ProductSchema>,
    ) {
        return this.productsService.update(id, updateProductDto)
    }

    @Delete(':id')
    @UsePipes(new ZodValidationPipe(IdSchema))
    remove(@Param('id') id: string) {
        return this.productsService.remove(id)
    }
}
