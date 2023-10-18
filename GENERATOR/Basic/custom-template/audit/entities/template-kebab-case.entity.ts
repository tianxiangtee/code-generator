import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { AuditSchema } from 'common/constant/common-schema';
import { Document } from 'mongoose';

export type TemplatePascalAuditDocument = TemplatePascalAudit & Document;
@Schema({ collection: 'TemplatePascalAudit' })
export class TemplatePascalAudit extends AuditSchema {}

export const TemplatePascalAuditSchema = SchemaFactory.createForClass(TemplatePascalAudit);
