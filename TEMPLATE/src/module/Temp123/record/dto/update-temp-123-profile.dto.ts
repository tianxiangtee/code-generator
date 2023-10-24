import { PartialType } from '@nestjs/swagger';
import { CreateTemp123ProfileDto } from './create-temp-123-profile.dto';

export class UpdateTemp123ProfileDto extends PartialType(
  CreateTemp123ProfileDto,
) {}
