import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { CommonSchema } from 'common/constant/common-schema';
import { Document } from 'mongoose';

export type TemplatePascalDocument = TemplatePascal & Document;
@Schema({ collection: 'TemplatePascal_DB' })
export class TemplatePascal extends CommonSchema {
  @ApiProperty()
  @Prop({ default: 'TemplatePascal Name' })
  template_name: string;
}

export const TemplatePascalSchema =
  SchemaFactory.createForClass(TemplatePascal);
