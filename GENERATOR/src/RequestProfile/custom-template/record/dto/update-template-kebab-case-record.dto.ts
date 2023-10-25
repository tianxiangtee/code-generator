import { PartialType } from '@nestjs/swagger';
import { CreateTemplatePascalRecordDto } from './create-template-kebab-case-record.dto';

export class UpdateTemplatePascalRecordDto extends PartialType(
  CreateTemplatePascalRecordDto,
) {}
