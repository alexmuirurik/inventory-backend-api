import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CheckinSessionsService } from './checkin-sessions.service';
import { CreateCheckinSessionDto } from './dto/create-checkin-session.dto';
import { UpdateCheckinSessionDto } from './dto/update-checkin-session.dto';

@Controller('checkin-sessions')
export class CheckinSessionsController {
  constructor(private readonly checkinSessionsService: CheckinSessionsService) {}

  @Post()
  create(@Body() createCheckinSessionDto: CreateCheckinSessionDto) {
    return this.checkinSessionsService.create(createCheckinSessionDto);
  }

  @Get()
  findAll() {
    return this.checkinSessionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.checkinSessionsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCheckinSessionDto: UpdateCheckinSessionDto) {
    return this.checkinSessionsService.update(+id, updateCheckinSessionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.checkinSessionsService.remove(+id);
  }
}
