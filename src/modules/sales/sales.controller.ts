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
import { SalesService } from './sales.service'
import z from 'zod'
import { SaleItemSchema } from 'src/common/schemas/sales.schema'
import { ZodValidationPipe } from 'src/common/validators/zodValidator'
import { IdSchema } from 'src/common/schemas/product.schemas'

@Controller('sales')
export class SalesController {
    constructor(private readonly salesService: SalesService) {}

	 @Get()
    findAll() {
        return this.salesService.findAll()
    }

    @Post()
	@UsePipes(new ZodValidationPipe(SaleItemSchema))
    create(@Body() createSaleDto: z.infer<typeof SaleItemSchema>) {
        return this.salesService.create(createSaleDto)
    }

    @Get(':id')
	@UsePipes(new ZodValidationPipe(IdSchema))
    findOne(@Param('id') id: string) {
        return this.salesService.findOne(id)
    }

    @Patch(':id')
	@UsePipes(new ZodValidationPipe(SaleItemSchema))
    update(
        @Param('id') id: string,
        @Body() updateSaleDto: z.infer<typeof SaleItemSchema>,
    ) {
        return this.salesService.update(id, updateSaleDto)
    }

    @Delete(':id')
	@UsePipes(new ZodValidationPipe(IdSchema))
    remove(@Param('id') id: string) {
        return this.salesService.remove(id)
    }
}
