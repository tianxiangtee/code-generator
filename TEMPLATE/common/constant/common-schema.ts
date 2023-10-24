import { Prop } from '@nestjs/mongoose';
import { ApiHideProperty } from '@nestjs/swagger';
import { Schema as s } from 'mongoose';

export class CommonSchema {
  @ApiHideProperty()
  @Prop({ unique: true })
  ref_id: string;

  @ApiHideProperty()
  @Prop()
  created_by: string;

  @ApiHideProperty()
  @Prop()
  created_by_name: string;

  @ApiHideProperty()
  @Prop({ default: new Date() })
  created_datetime_utc: Date;

  @ApiHideProperty()
  @Prop()
  updated_by: string;

  @ApiHideProperty()
  @Prop()
  updated_by_name: string;

  @ApiHideProperty()
  @Prop()
  updated_datetime_utc: Date;

  @ApiHideProperty()
  @Prop()
  organization_id: string;

  @ApiHideProperty()
  @Prop()
  user_id: string;

  @ApiHideProperty()
  @Prop()
  username: string;
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
