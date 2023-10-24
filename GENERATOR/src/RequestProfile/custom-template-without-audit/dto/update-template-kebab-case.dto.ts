import { PartialType } from '@nestjs/swagger';
import { CreateTemplatePascalDto } from './create-template-kebab-case.dto';

export class UpdateTemplatePascalDto extends PartialType(
  CreateTemplatePascalDto,
) {}
