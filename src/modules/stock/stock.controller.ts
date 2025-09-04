import {
    Body,
    Controller,
    Get,
    Param,
    Patch,
    Post,
    UsePipes,
} from '@nestjs/common'
import { StockService } from './stock.service'
import { ZodValidationPipe } from 'src/common/validators/zodValidator'
import {
    ProductCheckInSchema,
    StockSchema,
} from 'src/common/schemas/stock.schema'
import z from 'zod'

@Controller('stock')
export class StockController {
    constructor(private readonly stockService: StockService) {}

    @Get()
    async findAll() {
        return this.stockService.findAll()
    }

    @Post('filter')
    async filter(@Body() data: { status: string }) {
        return this.stockService.findByStatus(data.status)
    }

    @Post()
    @UsePipes(new ZodValidationPipe(ProductCheckInSchema))
    async create(@Body() data: z.infer<typeof ProductCheckInSchema>) {
        return this.stockService.create(data)
    }

    @Post('close/:id')
    async closeSession(@Param('id') id: string) {
        return this.stockService.closeSession(id)
    }

    @Get('/product/:id')
    async findOne(@Param('id') id: string) {
        return this.stockService.findOne(id)
    }

    @Patch('/product/:id')
    @UsePipes(new ZodValidationPipe(StockSchema))
    async update(
        @Param('id') id: string,
        @Body() data: z.infer<typeof StockSchema>,
    ) {
        data.id = id
        return this.stockService.update(data)
    }
}
