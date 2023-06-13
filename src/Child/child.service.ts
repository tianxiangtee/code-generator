import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { MasterService } from 'common/master.service';
import { Model } from 'mongoose';
import { AuditFilterChildDto } from './audit/dto/filter-child.dto';
import {
  ChildAudit,
  ChildAuditDocument,
} from './audit/entities/child.entity';
import { CreateChildDto } from './dto/create-child.dto';
import { FilterChildDto } from './dto/filter-child.dto';
import { UpdateChildDto } from './dto/update-child.dto';
import {
  Child,
  ChildDocument,
} from './entities/child.entity';

@Injectable()
export class ChildService extends MasterService<
  Child,
  ChildAudit,
  CreateChildDto,
  UpdateChildDto,
  FilterChildDto,
  AuditFilterChildDto
> {
  constructor(
    @InjectModel(Child.name)
    protected currentModel: Model<ChildDocument>,
    @InjectModel(ChildAudit.name)
    protected auditModel: Model<ChildAuditDocument>,
  ) {
    super(currentModel, auditModel);
  }
}
