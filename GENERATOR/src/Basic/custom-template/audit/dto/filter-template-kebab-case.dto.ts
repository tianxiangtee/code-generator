import { ApiProperty } from '@nestjs/swagger';
import { CommonFilterDto } from 'common/constant/common-dto';

export class AuditFilterTemplatePascalDto extends CommonFilterDto {
  @ApiProperty({ required: false })
  header_ref_id: string;
}
