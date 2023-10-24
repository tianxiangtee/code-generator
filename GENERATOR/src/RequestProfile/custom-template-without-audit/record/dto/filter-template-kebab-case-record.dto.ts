import { ApiProperty, IntersectionType } from '@nestjs/swagger';
import { CommonFilterDto } from 'common/constant/common-dto';
import { TemplatePascalDto } from '../../template-kebab-case.dto';

export class FilterTemplatePascalRecordDto extends IntersectionType(TemplatePascalDto, CommonFilterDto) {
  @ApiProperty({ required: false })
  record_column_name: string;
}
