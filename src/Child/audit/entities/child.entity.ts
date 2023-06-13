import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { AuditSchema } from 'common/constant/common-schema';
import { Document } from 'mongoose';

export type ChildAuditDocument = ChildAudit & Document;
@Schema({ collection: 'ChildAudit' })
export class ChildAudit extends AuditSchema {}

export const ChildAuditSchema = SchemaFactory.createForClass(ChildAudit);
