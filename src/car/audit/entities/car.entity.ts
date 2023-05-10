import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { AuditSchema } from 'common/constant/common-schema';
import { Document } from 'mongoose';

export type CarAuditDocument = CarAudit & Document;
@Schema({ collection: 'CarAudit' })
export class CarAudit extends AuditSchema {}

export const CarAuditSchema = SchemaFactory.createForClass(CarAudit);
