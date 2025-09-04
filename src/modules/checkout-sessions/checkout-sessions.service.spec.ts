import { Test, TestingModule } from '@nestjs/testing';
import { CheckoutSessionsService } from './checkout-sessions.service';

describe('CheckoutSessionsService', () => {
  let service: CheckoutSessionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CheckoutSessionsService],
    }).compile();

    service = module.get<CheckoutSessionsService>(CheckoutSessionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
