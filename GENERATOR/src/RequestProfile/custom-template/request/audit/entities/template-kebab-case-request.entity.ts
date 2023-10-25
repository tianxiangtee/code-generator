import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { AuditSchema } from 'common/constant/common-schema';
import { Document } from 'mongoose';

export type TemplatePascalRequestAuditDocument = TemplatePascalRequestAudit & Document;
@Schema({ collection: 'TemplatePascalRequestAudit' })
export class TemplatePascalRequestAudit extends AuditSchema {}

export const TemplatePascalRequestAuditSchema = SchemaFactory.createForClass(TemplatePascalRequestAudit);
