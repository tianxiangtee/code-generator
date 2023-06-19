import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { CommonSchema } from 'common/constant/common-schema';
import { Document } from 'mongoose';

export type ParentDocument = Parent & Document;
@Schema({ collection: 'Parent_DB' })
export class Parent extends CommonSchema {

  @ApiProperty()
  @Prop()
  is_ready_to_submit: boolean;

  @ApiProperty()
  @Prop()
  error_fields: string[];
  
  @ApiProperty()
  @Prop({ default: 'Parent Name' })
  template_name: string;

  @ApiProperty()
  @Prop({ default: 0 })
  child_count: number;
}

export const ParentSchema =
  SchemaFactory.createForClass(Parent);
