import { Module } from '@nestjs/common'
import { PrismaModule } from './modules/prisma/prisma.module'
import { AuthController } from './modules/auth/auth.controller';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { UsersService } from './modules/users/users.service';
import { UsersController } from './modules/users/users.controller';

@Module({
    imports: [PrismaModule, AuthModule, UsersModule],
    controllers: [AuthController, UsersController],
    providers: [UsersService],
})

export class AppModule {}
