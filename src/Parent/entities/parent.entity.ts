import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { CommonSchema } from 'common/constant/common-schema';
import { Document } from 'mongoose';

export type ParentDocument = Parent & Document;
@Schema({ collection: 'Parent_DB' })
export class Parent extends CommonSchema {
  @ApiProperty()
  @Prop({ default: 'Parent Name' })
  template_name: string;
}

export const ParentSchema =
  SchemaFactory.createForClass(Parent);
