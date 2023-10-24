import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { AuditSchema } from 'common/constant/common-schema';
import { Document } from 'mongoose';

export type Temp123ProfileAuditDocument = Temp123ProfileAudit & Document;
@Schema({ collection: 'Temp123ProfileAudit' })
export class Temp123ProfileAudit extends AuditSchema {}

export const Temp123ProfileAuditSchema = SchemaFactory.createForClass(Temp123ProfileAudit);
