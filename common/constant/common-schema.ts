import { Prop } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Schema as s } from 'mongoose';

export class CommonSchema {
  @ApiProperty()
  @Prop({ unique: true })
  ref_id: string;

  @ApiProperty()
  @Prop()
  created_by: string;

  @ApiProperty()
  @Prop()
  created_by_name: string;

  @ApiProperty()
  @Prop({ default: new Date() })
  created_datetime_utc: Date;

  @ApiProperty()
  @Prop()
  updated_by: string;

  @ApiProperty()
  @Prop()
  updated_by_name: string;

  @ApiProperty()
  @Prop()
  updated_datetime_utc: Date;

  @ApiProperty()
  @Prop()
  organization_id: string;
}

export class AuditSchema extends CommonSchema {
  @Prop()
  module: string;
  @Prop()
  action_type: string;
  @Prop()
  header_ref_id: string;
  @Prop()
  details: s.Types.Mixed;
  @Prop()
  changes: s.Types.Mixed[];
  @Prop()
  faults: s.Types.Mixed[];
}
