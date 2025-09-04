import { Body, Controller, Delete, Get, Param, Patch, Post, UsePipes } from '@nestjs/common'
import { StockService } from './stock.service'
import { ZodValidationPipe } from 'src/common/validators/zodValidator'
import { StockSchema } from 'src/common/schemas/stock.schema'
import z from 'zod'

@Controller('stock')
export class StockController {
    constructor(private readonly stockService: StockService) {}

    @Get()
    async findAll() {
        return this.stockService.findAll()
    }

    @Post()
    @UsePipes(new ZodValidationPipe(StockSchema))
    async create(@Body() data: z.infer<typeof StockSchema>) {
        return this.stockService.create(data)
    }

    @Get('/product/:id')
    async findOne(@Param('id') id: string) {
        return this.stockService.findOne(id)
    }

    @Patch('/product/:id')
    @UsePipes(new ZodValidationPipe(StockSchema))
    async update(@Param('id') id: string, @Body() data: z.infer<typeof StockSchema>) {
        data.id = id
        return this.stockService.update(data)
    }
}