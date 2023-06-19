import { ApiProperty } from '@nestjs/swagger';
import { CommonRequestDto } from 'common/constant/common-dto';

export class CreateParentDto extends CommonRequestDto {
  @ApiProperty()
  template_name: string;
}
