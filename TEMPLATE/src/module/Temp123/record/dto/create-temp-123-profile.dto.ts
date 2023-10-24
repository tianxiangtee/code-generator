import { ApiProperty } from '@nestjs/swagger';
import { Temp123 } from '../../temp-123.entity';

export class CreateTemp123ProfileDto extends Temp123 {
  @ApiProperty()
  profile_column_name: string;
}
