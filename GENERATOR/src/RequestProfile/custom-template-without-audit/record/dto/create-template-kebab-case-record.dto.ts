import { ApiProperty } from '@nestjs/swagger';
import { TemplatePascal } from '../../template-kebab-case.entity';

export class CreateTemplatePascalRecordDto extends TemplatePascal {
  @ApiProperty()
  record_column_name: string;
}
