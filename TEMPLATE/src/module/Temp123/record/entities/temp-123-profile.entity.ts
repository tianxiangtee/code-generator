import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';
import { Temp123 } from '../../temp-123.entity';

export type Temp123ProfileDocument = Temp123Profile & Document;
@Schema({ collection: 'Temp123_profile' })
export class Temp123Profile extends Temp123 {
  @ApiProperty()
  @Prop({ default: 'Temp123Profile Name' })
  profile_column_name: string;
}

export const Temp123ProfileSchema =
  SchemaFactory.createForClass(Temp123Profile);
