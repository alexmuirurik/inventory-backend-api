import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CheckoutSessionsService } from './checkout-sessions.service';
import { CreateCheckoutSessionDto } from './dto/create-checkout-session.dto';
import { UpdateCheckoutSessionDto } from './dto/update-checkout-session.dto';

@Controller('checkout-sessions')
export class CheckoutSessionsController {
  constructor(private readonly checkoutSessionsService: CheckoutSessionsService) {}

  @Post()
  create(@Body() createCheckoutSessionDto: CreateCheckoutSessionDto) {
    return this.checkoutSessionsService.create(createCheckoutSessionDto);
  }

  @Get()
  findAll() {
    return this.checkoutSessionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.checkoutSessionsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCheckoutSessionDto: UpdateCheckoutSessionDto) {
    return this.checkoutSessionsService.update(+id, updateCheckoutSessionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.checkoutSessionsService.remove(+id);
  }
}
