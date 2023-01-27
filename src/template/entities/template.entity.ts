import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { CommonSchema } from 'common/constant/common-schema';
import { Document } from 'mongoose';

export type TemplateDocument = Template & Document;
@Schema({ collection: 'Template' })
export class Template extends CommonSchema {
  @ApiProperty()
  @Prop({ default: 'Template Name' })
  template_name: string;
}

export const TemplateSchema = SchemaFactory.createForClass(Template);
