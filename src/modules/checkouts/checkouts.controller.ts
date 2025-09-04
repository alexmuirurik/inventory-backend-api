import { Controller, Post, Body, Param, UsePipes, Get } from '@nestjs/common'
import { CheckoutsService } from './checkouts.service'
import { ZodValidationPipe } from 'src/common/validators/zodValidator'
import z from 'zod'

@Controller('checkout-sessions')
export class CheckoutsController {
    constructor(private readonly checkoutsService: CheckoutsService) {}

    @Get('active/:userId')
    async getActiveSession(@Param('userId') userId: string) {
        return this.checkoutsService.getActiveSession(userId)
    }

    @Get(':id')
    async getSession(@Param('id') id: string) {
        return this.checkoutsService.getSession(id)
    }

    @Post('create/:userId')
    @UsePipes(
        new ZodValidationPipe(z.object({ openingCash: z.number().min(0) })),
    )
    async create(
        @Param('userId') userId: string,
        @Body('openingCash') openingCash: number,
    ) {
        return this.checkoutsService.create(userId, openingCash)
    }

    @Post('close/:userId')
    @UsePipes(
        new ZodValidationPipe(z.object({ closingCash: z.number().min(0) })),
    )
    async close(
        @Param('userId') userId: string,
        @Body('closingCash') closingCash: number,
    ) {
        return this.checkoutsService.close(userId, closingCash)
    }
}
