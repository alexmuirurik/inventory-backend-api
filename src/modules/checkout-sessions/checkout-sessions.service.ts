import { Injectable } from '@nestjs/common';
import { CreateCheckoutSessionDto } from './dto/create-checkout-session.dto';
import { UpdateCheckoutSessionDto } from './dto/update-checkout-session.dto';

@Injectable()
export class CheckoutSessionsService {
  create(createCheckoutSessionDto: CreateCheckoutSessionDto) {
    return 'This action adds a new checkoutSession';
  }

  findAll() {
    return `This action returns all checkoutSessions`;
  }

  findOne(id: number) {
    return `This action returns a #${id} checkoutSession`;
  }

  update(id: number, updateCheckoutSessionDto: UpdateCheckoutSessionDto) {
    return `This action updates a #${id} checkoutSession`;
  }

  remove(id: number) {
    return `This action removes a #${id} checkoutSession`;
  }
}
