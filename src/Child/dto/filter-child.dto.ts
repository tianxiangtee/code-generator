import { ApiProperty } from '@nestjs/swagger';
import { CommonFilterDto } from 'common/constant/common-dto';

export class FilterChildDto extends CommonFilterDto {
  @ApiProperty({ required: false })
  template_name: string;
}
