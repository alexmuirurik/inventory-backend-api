import { Test, TestingModule } from '@nestjs/testing';
import { CheckinSessionsService } from './checkin-sessions.service';

describe('CheckinSessionsService', () => {
  let service: CheckinSessionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CheckinSessionsService],
    }).compile();

    service = module.get<CheckinSessionsService>(CheckinSessionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
