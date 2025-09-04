import { Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common'
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

    @Post('customer')
    async createCustomer(@Body() createUserDto: CreateUserDto) {
        return this.usersService.createCustomer(createUserDto)
    }

    @Patch('/customer/:id')
    async updateCustomer(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        return this.usersService.updateCustomer(id, updateUserDto)
    }

    @Post('cashier')
    async createCashier(@Body() createUserDto: CreateUserDto) {
        return this.usersService.createCashier(createUserDto)
    }

    @Patch('/cashier/:id')
    async updateCashier(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        return this.usersService.updateCashier(id, updateUserDto)
    }

    @Post('manager')
    async createManager(@Body() createUserDto: CreateUserDto) {
        return this.usersService.createManager(createUserDto)
    }

    @Patch('/customer/:id')
    async updateCustomer(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        return this.usersService.updateCustomer(id, updateUserDto)
    }

    @Post('supplier')
    async createSupplier(@Body() createUserDto: CreateUserDto) {
        return this.usersService.createSupplier(createUserDto)
    }

    @Patch('/supplier/:id')
    async updateSupplier(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        return this.usersService.updateSupplier(id, updateUserDto)
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
        return this.usersService.deleteUserById(id)
    }
}
