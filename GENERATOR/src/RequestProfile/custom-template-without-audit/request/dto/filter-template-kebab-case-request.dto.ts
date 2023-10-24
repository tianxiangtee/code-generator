import { ApiProperty, IntersectionType } from '@nestjs/swagger';
import { CommonFilterDto } from 'common/constant/common-dto';
import { TemplatePascalDto } from '../../template-kebab-case.dto';

export class FilterTemplatePascalRequestDto extends IntersectionType(TemplatePascalDto, CommonFilterDto) {
  @ApiProperty({ required: false })
  request_column_name: string;
}
