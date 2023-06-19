import { ApiProperty } from '@nestjs/swagger';
import { CommonDto } from 'common/constant/common-dto';

export class CreateParentDto extends CommonDto {
  @ApiProperty()
  is_ready_to_submit: boolean;

  @ApiProperty()
  error_fields: string[];

  @ApiProperty()
  template_name: string;
}
