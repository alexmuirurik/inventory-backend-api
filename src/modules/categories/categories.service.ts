import { Injectable } from '@nestjs/common'
import { CategorySchema } from 'src/common/schemas/category.schema'
import z from 'zod'

@Injectable()
export class CategoriesService {
    create(createCategory: z.infer<typeof CategorySchema>) {
        return 'This action adds a new category'
    }

    findAll() {
        return `This action returns all categories`
    }

    findOne(id: number) {
        return `This action returns a #${id} category`
    }

    update(id: number, updateCategory: z.infer<typeof CategorySchema>) {
        return `This action updates a #${id} category`
    }

    remove(id: number) {
        return `This action removes a #${id} category`
    }
}
