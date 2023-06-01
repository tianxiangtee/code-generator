import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { MasterService } from 'common/master.service';
import { Model } from 'mongoose';
import { AuditFilterTemplateDto } from './audit/dto/filter-template.dto';
import {
  TemplateAudit,
  TemplateAuditDocument,
} from './audit/entities/template.entity';
import { CreateTemplateDto } from './dto/create-template.dto';
import { FilterTemplateDto } from './dto/filter-template.dto';
import { UpdateTemplateDto } from './dto/update-template.dto';
import { Template, TemplateDocument } from './entities/template.entity';

@Injectable()
export class TemplateService extends MasterService<
  Template,
  TemplateAudit,
  CreateTemplateDto,
  UpdateTemplateDto,
  FilterTemplateDto,
  AuditFilterTemplateDto
> {
  constructor(
    @InjectModel(Template.name)
    protected currentModel: Model<TemplateDocument>,
    @InjectModel(TemplateAudit.name)
    protected auditModel: Model<TemplateAuditDocument>,
  ) {
    super(currentModel, auditModel);
  }
}
