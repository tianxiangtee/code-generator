import { ApiProperty } from '@nestjs/swagger';
import { TemplatePascal } from '../../template-kebab-case.entity';

export class CreateTemplatePascalRequestDto extends TemplatePascal {
  @ApiProperty()
  request_column_name: string;
}
