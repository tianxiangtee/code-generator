import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

export type TemplateDocument = Template & Document;
@Schema({ collection: 'Template' })
export class Template {
  @ApiProperty()
  @Prop({ default: 'Template Name' })
  template_name: string;
}

export const TemplateSchema = SchemaFactory.createForClass(Template);
