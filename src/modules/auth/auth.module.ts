import { Logger, Module } from '@nestjs/common'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { JWT_ACCESS_TOKEN_EXPIRY_TIME } from './auth.constants'
import { JwtStrategy } from './strategies/jwt-strategy'
import { PassportModule } from '@nestjs/passport'
import { UsersModule } from '../users/users.module'
import { SequelizeModule } from '@nestjs/sequelize'
import { JwtRefreshStrategy } from './strategies/jwt-refresh.strategy'
import { APP_GUARD } from '@nestjs/core'
import { JwtAuthGuard } from './guards/jwt-auth.guard'

@Module({
	imports: [
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
		JwtModule,
		JwtStrategy,
        Logger,
        JwtRefreshStrategy,
        {
            provide: APP_GUARD,
            useClass: JwtAuthGuard
        }

    ],
})
export class AuthModule {}
