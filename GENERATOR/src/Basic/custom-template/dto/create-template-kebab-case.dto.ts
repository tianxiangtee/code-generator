import { ApiProperty } from '@nestjs/swagger';
import { CommonDto } from 'common/constant/common-dto';

export class CreateTemplatePascalDto extends CommonDto {
  @ApiProperty()
  template_name: string;
}
