import { PartialType } from '@nestjs/swagger';
import { CreateCheckoutSessionDto } from './create-checkout-session.dto';

export class UpdateCheckoutSessionDto extends PartialType(CreateCheckoutSessionDto) {}
