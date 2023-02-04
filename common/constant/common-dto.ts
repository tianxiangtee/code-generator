import { ApiProperty } from '@nestjs/swagger';

export class CommonDto {
  username: string;
  user_id: string;
  organization_id: string;
}

export class CommonFilterDto {
  @ApiProperty({ required: false })
  limit: number;
  @ApiProperty({ required: false })
  offset: number;
  @ApiProperty({ required: false })
  sort_by: string;
  @ApiProperty({ required: false })
  sort_order: string;
}
