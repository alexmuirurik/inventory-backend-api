import { PartialType } from '@nestjs/swagger';
import { CreateCheckinSessionDto } from './create-checkin-session.dto';

export class UpdateCheckinSessionDto extends PartialType(CreateCheckinSessionDto) {}
