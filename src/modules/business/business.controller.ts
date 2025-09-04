import { Body, Controller, Post, UsePipes } from '@nestjs/common'
import { BusinessService } from './business.service'
import { ZodValidationPipe } from 'src/common/validators/zodValidator'
import { StoreLocationSchema } from 'src/common/schemas/store.schema'
import z from 'zod'
import { Roles } from 'src/decorators/role.decorator'
import { Role } from 'src/common/enums/role.enums'

@Controller('business')
export class BusinessController {
    constructor(private businessService: BusinessService) {}

    @Post()
    @Roles(Role.ADMIN)
    @UsePipes(new ZodValidationPipe(StoreLocationSchema))
    async createBusinessLocation(
        @Body() body: z.infer<typeof StoreLocationSchema>,
    ) {
        this.businessService.createBusinessLocation(body)
    }
}
