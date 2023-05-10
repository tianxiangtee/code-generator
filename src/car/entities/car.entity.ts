import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { CommonSchema } from 'common/constant/common-schema';
import { Document } from 'mongoose';

export type CarDocument = Car & Document;
@Schema({ collection: 'Car' })
export class Car extends CommonSchema {
  @ApiProperty()
  @Prop({ default: 'Car Name' })
  car_name: string;
}

export const CarSchema = SchemaFactory.createForClass(Car);
