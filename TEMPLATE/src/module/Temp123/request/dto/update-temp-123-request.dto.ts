import { PartialType } from '@nestjs/swagger';
import { CreateTemp123RequestDto } from './create-temp-123-request.dto';

export class UpdateTemp123RequestDto extends PartialType(
  CreateTemp123RequestDto,
) {}
