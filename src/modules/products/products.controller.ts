import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    UsePipes,
} from '@nestjs/common'
import { ProductsService } from './products.service'
import z from 'zod'
import { IdSchema, ProductSchema } from 'src/common/schemas/product.schemas'
import { ZodValidationPipe } from 'src/common/validators/zodValidator'

@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) {}

    @Get()
    findAll() {
        return this.productsService.findAll()
    }

    @Post()
    @UsePipes(new ZodValidationPipe(ProductSchema))
    create(@Body() createProductDto: z.infer<typeof ProductSchema>) {
        return this.productsService.create(createProductDto)
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
