import { Body, Controller, Get, Post, Req, UsePipes } from '@nestjs/common'
import { BusinessService } from './business.service'
import { ZodValidationPipe } from 'src/common/validators/zodValidator'
import { StoreLocationSchema } from 'src/common/schemas/store.schema'
import z from 'zod'
import { Roles } from 'src/decorators/role.decorator'
import { Role } from 'src/common/enums/role.enums'
import express from 'express'
import { UserWithoutPassword } from 'src/common/interfaces/userInterfaces'

@Controller('business')
export class BusinessController {
    constructor(private businessService: BusinessService) {}

    @Get()
    @Roles(Role.ADMIN)
    async getBusinessLocations(@Req() req: express.Request) {
        return this.businessService.getBusinessLocations(
            req.user as UserWithoutPassword,
        )
    }

    @Post()
    @Roles(Role.ADMIN)
    @UsePipes(new ZodValidationPipe(StoreLocationSchema))
    async createBusinessLocation(
        @Body() body: z.infer<typeof StoreLocationSchema>,
    ) {
        this.businessService.createBusinessLocation(body)
    }
}
