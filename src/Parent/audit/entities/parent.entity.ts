import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { AuditSchema } from 'common/constant/common-schema';
import { Document } from 'mongoose';

export type ParentAuditDocument = ParentAudit & Document;
@Schema({ collection: 'ParentAudit' })
export class ParentAudit extends AuditSchema {}

export const ParentAuditSchema = SchemaFactory.createForClass(ParentAudit);
