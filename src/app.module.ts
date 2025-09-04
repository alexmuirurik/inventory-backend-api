import { Module } from '@nestjs/common'
import { PrismaModule } from './modules/prisma/prisma.module'
import { AuthController } from './modules/auth/auth.controller'
import { AuthModule } from './modules/auth/auth.module'
import { UsersModule } from './modules/users/users.module'
import { UsersService } from './modules/users/users.service'
import { UsersController } from './modules/users/users.controller'
import { AuthService } from './modules/auth/auth.service'
import { PrismaService } from './modules/prisma/prisma.service'
import { ProductsModule } from './modules/products/products.module'
import { CategoriesModule } from './modules/categories/categories.module'
import { SalesModule } from './modules/sales/sales.module'
import { CheckoutSessionsModule } from './modules/checkout-sessions/checkout-sessions.module';
import { CheckinSessionsModule } from './modules/checkin-sessions/checkin-sessions.module';
import { ReportsModule } from './modules/reports/reports.module';

@Module({
    imports: [
        PrismaModule,
        AuthModule,
        UsersModule,
        ProductsModule,
        CategoriesModule,
        SalesModule,
        CheckoutSessionsModule,
        CheckinSessionsModule,
        ReportsModule,
    ],
    controllers: [AuthController, UsersController],
    providers: [UsersService, AuthService, PrismaService],
})
export class AppModule {}
