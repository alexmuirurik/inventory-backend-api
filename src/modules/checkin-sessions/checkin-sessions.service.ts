import { Injectable } from '@nestjs/common';
import { CreateCheckinSessionDto } from './dto/create-checkin-session.dto';
import { UpdateCheckinSessionDto } from './dto/update-checkin-session.dto';

@Injectable()
export class CheckinSessionsService {
  create(createCheckinSessionDto: CreateCheckinSessionDto) {
    return 'This action adds a new checkinSession';
  }

  findAll() {
    return `This action returns all checkinSessions`;
  }

  findOne(id: number) {
    return `This action returns a #${id} checkinSession`;
  }

  update(id: number, updateCheckinSessionDto: UpdateCheckinSessionDto) {
    return `This action updates a #${id} checkinSession`;
  }

  remove(id: number) {
    return `This action removes a #${id} checkinSession`;
  }
}
