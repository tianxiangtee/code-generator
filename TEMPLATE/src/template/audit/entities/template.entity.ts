import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { AuditSchema } from 'common/constant/common-schema';
import { Document } from 'mongoose';

export type TemplateAuditDocument = TemplateAudit & Document;
@Schema({ collection: 'TemplateAudit' })
export class TemplateAudit extends AuditSchema {}

export const TemplateAuditSchema = SchemaFactory.createForClass(TemplateAudit);
