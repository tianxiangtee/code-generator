import { ApiProperty } from '@nestjs/swagger';
import { CommonFilterDto } from 'common/constant/common-dto';

export class AuditFilterTemp123ProfileDto extends CommonFilterDto {
  @ApiProperty({ required: false })
  header_ref_id: string;
}
