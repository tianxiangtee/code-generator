import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { MasterService } from 'common/master.service';
import { Model } from 'mongoose';
import { AuditFilterTemplatePascalRecordDto } from './audit/dto/filter-template-kebab-case-record.dto';
import {
  TemplatePascalRecordAudit,
  TemplatePascalRecordAuditDocument
} from './audit/entities/template-kebab-case-record.entity';
import { CreateTemplatePascalRecordDto } from './dto/create-template-kebab-case-record.dto';
import { FilterTemplatePascalRecordDto } from './dto/filter-template-kebab-case-record.dto';
import { UpdateTemplatePascalRecordDto } from './dto/update-template-kebab-case-record.dto';
import {
  TemplatePascalRecord,
  TemplatePascalRecordDocument,
} from './entities/template-kebab-case-record.entity';

@Injectable()
export class TemplatePascalRecordService extends MasterService<
  TemplatePascalRecord,
  TemplatePascalRecordAudit,
  CreateTemplatePascalRecordDto,
  UpdateTemplatePascalRecordDto,
  FilterTemplatePascalRecordDto,
  AuditFilterTemplatePascalRecordDto
> {
  constructor(
    @InjectModel(TemplatePascalRecord.name)
    protected currentModel: Model<TemplatePascalRecordDocument>,
    @InjectModel(TemplatePascalRecordAudit.name)
    protected auditModel: Model<TemplatePascalRecordAuditDocument>,
  ) {
    super(currentModel, auditModel);
  }
}
