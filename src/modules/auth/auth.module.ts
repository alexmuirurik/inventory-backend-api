import { Logger, Module } from '@nestjs/common'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { JWT_ACCESS_TOKEN_EXPIRY_TIME } from './auth.constants'
import { PassportModule } from '@nestjs/passport'
import { UsersModule } from '../users/users.module'
import { APP_GUARD } from '@nestjs/core'
import { JwtAuthGuard } from './guards/jwt-auth.guard'
import { JwtStrategy } from './strategies/jwt-strategy'

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        UsersModule,
        PassportModule,
        JwtModule.registerAsync({
            global: true,
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => {
                return {
                    secret: configService.get('JWT_ACCESS_TOKEN_SECRET'),
                    signOptions: {
                        expiresIn: JWT_ACCESS_TOKEN_EXPIRY_TIME,
                    },
                }
            },
        }),
    ],
    controllers: [AuthController],
    providers: [
        AuthService,
        JwtStrategy,
        {
            provide: APP_GUARD,
            useClass: JwtAuthGuard,
        },
    ],
    exports: [AuthService],
})
export class AuthModule {}
