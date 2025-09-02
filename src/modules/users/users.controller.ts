import { Controller, Delete, Get, Param } from '@nestjs/common'
import { UsersService } from './users.service'

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get()
    async findAll() {
        return this.usersService.findAll()
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        return this.usersService.findUserById(id)
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
        return this.usersService.deleteUserById(id)
    }
}
