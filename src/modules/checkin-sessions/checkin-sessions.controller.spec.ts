import { Test, TestingModule } from '@nestjs/testing';
import { CheckinSessionsController } from './checkin-sessions.controller';
import { CheckinSessionsService } from './checkin-sessions.service';

describe('CheckinSessionsController', () => {
  let controller: CheckinSessionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CheckinSessionsController],
      providers: [CheckinSessionsService],
    }).compile();

    controller = module.get<CheckinSessionsController>(CheckinSessionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
