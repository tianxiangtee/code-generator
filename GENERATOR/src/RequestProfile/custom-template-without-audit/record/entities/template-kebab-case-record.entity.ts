import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';
import { TemplatePascal } from '../../template-kebab-case.entity';

export type TemplatePascalRecordDocument = TemplatePascalRecord & Document;
@Schema({ collection: 'TemplatePascal_record' })
export class TemplatePascalRecord extends TemplatePascal {
  @ApiProperty()
  @Prop({ default: 'TemplatePascalRecord Name' })
  record_column_name: string;
}

export const TemplatePascalRecordSchema =
  SchemaFactory.createForClass(TemplatePascalRecord);
