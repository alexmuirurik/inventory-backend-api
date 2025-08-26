import { Module } from '@nestjs/common'
import { UserModule } from './modules/user/user.module'
import { PrismaModule } from './modules/prisma/prisma.module'
import { AuthController } from './modules/auth/auth.controller';
import { AuthModule } from './modules/auth/auth.module';

@Module({
    imports: [UserModule, PrismaModule, AuthModule],
    controllers: [AuthController],
})
export class AppModule {}
