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
import { PurchasesService } from './purchases.service'
import z from 'zod'
import { ProductCheckinItemSchema } from 'src/common/schemas/stock.schema'
import { ZodValidationPipe } from 'src/common/validators/zodValidator'
import { IdSchema } from 'src/common/schemas/product.schemas'

@Controller('purchases')
export class PurchasesController {
    constructor(private readonly purchasesService: PurchasesService) {}

    @Get()
    findAll() {
        return this.purchasesService.findAll()
    }

    @Post()
    @UsePipes(new ZodValidationPipe(ProductCheckinItemSchema))
    create(
        @Body() createPurchaseDto: z.infer<typeof ProductCheckinItemSchema>,
    ) {
        return this.purchasesService.create(createPurchaseDto)
    }

    @Get(':id')
    @UsePipes(new ZodValidationPipe(IdSchema))
    findOne(@Param('id') id: string) {
        return this.purchasesService.findOne(id)
    }

    @Patch(':id')
    @UsePipes(new ZodValidationPipe(ProductCheckinItemSchema))
    update(
        @Param('id') id: string,
        @Body() updatePurchaseDto: z.infer<typeof ProductCheckinItemSchema>,
    ) {
        return this.purchasesService.update(id, updatePurchaseDto)
    }

    @Delete(':id')
    @UsePipes(new ZodValidationPipe(IdSchema))
    remove(@Param('id') id: string) {
        return this.purchasesService.remove(id)
    }
}
