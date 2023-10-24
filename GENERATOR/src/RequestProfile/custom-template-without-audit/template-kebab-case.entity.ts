import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { CommonSchema } from 'common/constant/common-schema';

export class TemplatePascal extends CommonSchema {
  // Common field for both requests and records
  @ApiProperty()
  @Prop({ default: 'TemplatePascal Name' })
  template_name: string;
}
