import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    UsePipes,
} from '@nestjs/common'
import { CategoriesService } from './categories.service'
import z from 'zod'
import { CategorySchema } from 'src/common/schemas/category.schema'
import { ZodValidationPipe } from 'src/common/validators/zodValidator'
import { IdSchema } from 'src/common/schemas/product.schemas'

@Controller('categories')
export class CategoriesController {
    constructor(private readonly categoriesService: CategoriesService) {}

    @Post()
    @UsePipes(new ZodValidationPipe(CategorySchema))
    async create(@Body() createCategory: z.infer<typeof CategorySchema>) {
        return this.categoriesService.create(createCategory)
    }

    @Get()
    async findAll() {
        return await this.categoriesService.findAll()
    }

    @Get(':id')
    @UsePipes(new ZodValidationPipe(IdSchema))
    async findOne(@Param('id') id: string) {
        return await this.categoriesService.findOne(id)
    }

    @Patch(':id')
    @UsePipes(new ZodValidationPipe(IdSchema))
    async update(
        @Param('id') id: string,
        @Body() updateCategory: z.infer<typeof CategorySchema>,
    ) {
        return await this.categoriesService.update(updateCategory)
    }

    @Delete(':id')
    @UsePipes(new ZodValidationPipe(IdSchema))
    async remove(@Param('id') id: string) {
        return await this.categoriesService.remove(id)
    }
}
