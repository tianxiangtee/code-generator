import { ApiProperty } from '@nestjs/swagger';
import { CommonFilterDto } from 'common/constant/common-dto';

export class FilterTemplatePascalDto extends CommonFilterDto {
  @ApiProperty({ required: false })
  template_name: string;
}
