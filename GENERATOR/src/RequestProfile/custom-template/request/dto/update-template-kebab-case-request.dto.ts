import { PartialType } from '@nestjs/swagger';
import { CreateTemplatePascalRequestDto } from './create-template-kebab-case-request.dto';

export class UpdateTemplatePascalRequestDto extends PartialType(
  CreateTemplatePascalRequestDto,
) {}
