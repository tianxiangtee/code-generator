import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';
import { TemplatePascal } from '../../template-kebab-case.entity';

export type TemplatePascalRequestDocument = TemplatePascalRequest & Document;
@Schema({ collection: 'TemplatePascal_request' })
export class TemplatePascalRequest extends TemplatePascal {
  @ApiProperty()
  @Prop({ default: 'TemplatePascalRequest Name' })
  request_column_name: string;
}

export const TemplatePascalRequestSchema =
  SchemaFactory.createForClass(TemplatePascalRequest);
