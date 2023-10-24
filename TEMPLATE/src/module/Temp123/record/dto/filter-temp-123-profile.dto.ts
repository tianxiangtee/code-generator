import { ApiProperty, IntersectionType } from '@nestjs/swagger';
import { CommonFilterDto } from 'common/constant/common-dto';
import { Temp123Dto } from '../../temp-123.dto';

export class FilterTemp123ProfileDto extends IntersectionType(Temp123Dto, CommonFilterDto) {
  @ApiProperty({ required: false })
  profile_column_name: string;
}
