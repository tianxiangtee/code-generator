import { ApiProperty } from '@nestjs/swagger';
import { CommonDto } from 'common/constant/common-dto';

export class CreateParentDto extends CommonDto {
  @ApiProperty()
  template_name: string;
}
