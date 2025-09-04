import { Module } from '@nestjs/common';
import { CheckinSessionsService } from './checkin-sessions.service';
import { CheckinSessionsController } from './checkin-sessions.controller';

@Module({
  controllers: [CheckinSessionsController],
  providers: [CheckinSessionsService],
})
export class CheckinSessionsModule {}
