import { ApiProperty } from '@nestjs/swagger';

export class CommonDto {
  username: string;
  user_id: string;
  organization_id: string;
}

export class CommonRequestDto extends CommonDto {
  @ApiProperty()
  header_ref_id: string;
  @ApiProperty({ default: false })
  is_ready_to_submit: boolean;
  @ApiProperty()
  error_fields: string[];
}

export class CommonFilterDto {
  @ApiProperty({ required: false })
  limit: number;
  @ApiProperty({ required: false })
  offset: number;
  @ApiProperty({ required: false })
  sortBy: string;
  @ApiProperty({ required: false })
  sortDirection: string;
}
