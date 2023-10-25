import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { AuditSchema } from 'common/constant/common-schema';
import { Document } from 'mongoose';

export type TemplatePascalRecordAuditDocument = TemplatePascalRecordAudit & Document;
@Schema({ collection: 'TemplatePascalRecordAudit' })
export class TemplatePascalRecordAudit extends AuditSchema {}

export const TemplatePascalRecordAuditSchema = SchemaFactory.createForClass(TemplatePascalRecordAudit);
