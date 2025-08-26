import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { ValidationPipe, VersioningType } from '@nestjs/common'
import helmet from 'helmet'
import * as cookieParser from 'cookie-parser'

async function bootstrap() {
    const app = await NestFactory.create(AppModule, { rawBody: true })

    app.enableVersioning({
        defaultVersion: '1',
        type: VersioningType.URI,
    })

    app.setGlobalPrefix('api')

    const config = new DocumentBuilder()
        .setTitle('Huntsman Backend API')
        .setDescription(
            'RESTful API for Huntsman App Backend, helping the hunting community in UK.',
        )
        .addBearerAuth({
            type: 'http',
            scheme: 'bearer',
            in: 'header',
        })
        .setVersion('1.0')
        .build()

    const document = SwaggerModule.createDocument(app, config)

    SwaggerModule.setup('docs', app, document)

    app.use(helmet())
    app.use(cookieParser.default())

    app.enableCors({
        credentials: true,
        origin: '*',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        preflightContinue: false,
        optionsSuccessStatus: 200,
    })

    await app.listen(process.env.PORT ?? 3001)
}
bootstrap()
