import { ApiProperty } from '@nestjs/swagger';
import { CommonDto } from 'common/constant/common-dto';

export class CreateChildDto extends CommonDto {
  @ApiProperty()
  header_ref_id: string;

  @ApiProperty({ default: false })
  is_ready_to_submit: boolean;

  @ApiProperty()
  error_fields: string[];

  @ApiProperty()
  template_name: string;
}
