import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { MasterService } from 'common/master.service';
import { Model } from 'mongoose';
import { AuditFilterTemplatePascalDto } from './audit/dto/filter-template-kebab-case.dto';
import {
  TemplatePascalAudit,
  TemplatePascalAuditDocument,
} from './audit/entities/template-kebab-case.entity';
import { CreateTemplatePascalDto } from './dto/create-template-kebab-case.dto';
import { FilterTemplatePascalDto } from './dto/filter-template-kebab-case.dto';
import { UpdateTemplatePascalDto } from './dto/update-template-kebab-case.dto';
import {
  TemplatePascal,
  TemplatePascalDocument,
} from './entities/template-kebab-case.entity';

@Injectable()
export class TemplatePascalService extends MasterService<
  TemplatePascal,
  TemplatePascalAudit,
  CreateTemplatePascalDto,
  UpdateTemplatePascalDto,
  FilterTemplatePascalDto,
  AuditFilterTemplatePascalDto
> {
  constructor(
    @InjectModel(TemplatePascal.name)
    protected currentModel: Model<TemplatePascalDocument>,
    @InjectModel(TemplatePascalAudit.name)
    protected auditModel: Model<TemplatePascalAuditDocument>,
  ) {
    super(currentModel, auditModel);
  }
}
