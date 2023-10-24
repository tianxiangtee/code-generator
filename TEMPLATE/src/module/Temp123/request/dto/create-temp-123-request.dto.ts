import { ApiProperty } from '@nestjs/swagger';
import { Temp123 } from '../../temp-123.entity';

export class CreateTemp123RequestDto extends Temp123 {
  @ApiProperty()
  request_column_name: string;
}
