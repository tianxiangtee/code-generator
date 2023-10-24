import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { MasterService } from 'common/master.service';
import { Model } from 'mongoose';
import { AuditFilterTemp123RequestDto } from './audit/dto/filter-temp-123-request.dto';
import {
  Temp123RequestAudit,
  Temp123RequestAuditDocument,
} from './audit/entities/temp-123-request.entity';
import { CreateTemp123RequestDto } from './dto/create-temp-123-request.dto';
import { FilterTemp123RequestDto } from './dto/filter-temp-123-request.dto';
import { UpdateTemp123RequestDto } from './dto/update-temp-123-request.dto';
import {
  Temp123Request,
  Temp123RequestDocument,
} from './entities/temp-123-request.entity';

@Injectable()
export class Temp123RequestService extends MasterService<
  Temp123Request,
  Temp123RequestAudit,
  CreateTemp123RequestDto,
  UpdateTemp123RequestDto,
  FilterTemp123RequestDto,
  AuditFilterTemp123RequestDto
> {
  constructor(
    @InjectModel(Temp123Request.name)
    protected currentModel: Model<Temp123RequestDocument>,
    @InjectModel(Temp123RequestAudit.name)
    protected auditModel: Model<Temp123RequestAuditDocument>,
  ) {
    super(currentModel, auditModel);
  }
}
