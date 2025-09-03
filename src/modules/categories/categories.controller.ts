import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
} from '@nestjs/common'
import { CategoriesService } from './categories.service'
import z from 'zod'
import { CategorySchema } from 'src/common/schemas/category.schema'

@Controller('categories')
export class CategoriesController {
    constructor(private readonly categoriesService: CategoriesService) {}

    @Post()
    create(@Body() createCategoryDto: z.infer<typeof CategorySchema>) {
        return this.categoriesService.create(createCategoryDto)
    }

    @Get()
    findAll() {
        return this.categoriesService.findAll()
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.categoriesService.findOne(+id)
    }

    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() updateCategoryDto: z.infer<typeof CategorySchema>,
    ) {
        return this.categoriesService.update(+id, updateCategoryDto)
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.categoriesService.remove(+id)
    }
}
