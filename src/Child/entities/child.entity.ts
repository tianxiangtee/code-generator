import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { CommonSchema } from 'common/constant/common-schema';
import { Document } from 'mongoose';

export type ChildDocument = Child & Document;
@Schema({ collection: 'Child_DB' })
export class Child extends CommonSchema {
  @ApiProperty()
  @Prop()
  header_ref_id: string;

  @ApiProperty()
  @Prop()
  is_ready_to_submit: boolean;

  @ApiProperty()
  @Prop()
  error_fields: string[];

  @ApiProperty()
  @Prop({ default: 'Child Name' })
  template_name: string;
}

export const ChildSchema =
  SchemaFactory.createForClass(Child);
