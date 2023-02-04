import { ApiProperty } from '@nestjs/swagger';
import { CommonFilterDto } from 'common/constant/common-dto';

export class FilterTemplateDto extends CommonFilterDto {
  @ApiProperty({ required: true })
  template_name: string;
}
