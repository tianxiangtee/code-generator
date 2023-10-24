import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { CommonSchema } from 'common/constant/common-schema';

export class Temp123 extends CommonSchema {
  // Common field for both requests and records
  @ApiProperty()
  @Prop({ default: 'Temp123 Name' })
  template_name: string;
}
