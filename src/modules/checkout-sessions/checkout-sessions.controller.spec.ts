import { Test, TestingModule } from '@nestjs/testing';
import { CheckoutSessionsController } from './checkout-sessions.controller';
import { CheckoutSessionsService } from './checkout-sessions.service';

describe('CheckoutSessionsController', () => {
  let controller: CheckoutSessionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CheckoutSessionsController],
      providers: [CheckoutSessionsService],
    }).compile();

    controller = module.get<CheckoutSessionsController>(CheckoutSessionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
