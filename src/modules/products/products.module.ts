import { Module } from '@nestjs/common'
import { ProductsService } from './products.service'
import { ProductsController } from './products.controller'
import { StockModule } from '../stock/stock.module'

@Module({
    imports: [StockModule],
    controllers: [ProductsController],
    providers: [ProductsService],
})
export class ProductsModule {}
