import { Module } from '@nestjs/common'
import { UserModule } from './user/user.module'
import { PrismaModule } from './prisma/prisma.module'
import { AuthController } from './auth/auth.controller';

@Module({
    imports: [UserModule, PrismaModule],
    controllers: [AuthController],
})
export class AppModule {}
