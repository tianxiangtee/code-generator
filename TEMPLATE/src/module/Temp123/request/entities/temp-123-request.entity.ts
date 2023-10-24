import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';
import { Temp123 } from '../../temp-123.entity';

export type Temp123RequestDocument = Temp123Request & Document;
@Schema({ collection: 'Temp123_request' })
export class Temp123Request extends Temp123 {
  @ApiProperty()
  @Prop({ default: 'Temp123Request Name' })
  request_column_name: string;
}

export const Temp123RequestSchema =
  SchemaFactory.createForClass(Temp123Request);
