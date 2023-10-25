import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { MasterService } from 'common/master.service';
import { Model } from 'mongoose';
import { AuditFilterTemplatePascalRequestDto } from './audit/dto/filter-template-kebab-case-request.dto';
import {
  TemplatePascalRequestAudit,
  TemplatePascalRequestAuditDocument
} from './audit/entities/template-kebab-case-request.entity';
import { CreateTemplatePascalRequestDto } from './dto/create-template-kebab-case-request.dto';
import { FilterTemplatePascalRequestDto } from './dto/filter-template-kebab-case-request.dto';
import { UpdateTemplatePascalRequestDto } from './dto/update-template-kebab-case-request.dto';
import {
  TemplatePascalRequest,
  TemplatePascalRequestDocument,
} from './entities/template-kebab-case-request.entity';

@Injectable()
export class TemplatePascalRequestService extends MasterService<
  TemplatePascalRequest,
  TemplatePascalRequestAudit,
  CreateTemplatePascalRequestDto,
  UpdateTemplatePascalRequestDto,
  FilterTemplatePascalRequestDto,
  AuditFilterTemplatePascalRequestDto
> {
  constructor(
    @InjectModel(TemplatePascalRequest.name)
    protected currentModel: Model<TemplatePascalRequestDocument>,
    @InjectModel(TemplatePascalRequestAudit.name)
    protected auditModel: Model<TemplatePascalRequestAuditDocument>,
  ) {
    super(currentModel, auditModel);
  }
}
