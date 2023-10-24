import { ApiProperty, IntersectionType } from '@nestjs/swagger';
import { CommonFilterDto } from 'common/constant/common-dto';
import { Temp123Dto } from '../../temp-123.dto';

export class FilterTemp123RequestDto extends IntersectionType(Temp123Dto, CommonFilterDto) {
  @ApiProperty({ required: false })
  request_column_name: string;
}
