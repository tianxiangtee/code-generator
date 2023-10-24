import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { AuditSchema } from 'common/constant/common-schema';
import { Document } from 'mongoose';

export type Temp123RequestAuditDocument = Temp123RequestAudit & Document;
@Schema({ collection: 'Temp123RequestAudit' })
export class Temp123RequestAudit extends AuditSchema {}

export const Temp123RequestAuditSchema = SchemaFactory.createForClass(Temp123RequestAudit);
