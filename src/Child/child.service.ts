import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuditFilterChildDto } from './audit/dto/filter-child.dto';
import { ChildAudit, ChildAuditDocument } from './audit/entities/child.entity';
import { CreateChildDto } from './dto/create-child.dto';
import { FilterChildDto } from './dto/filter-child.dto';
import { UpdateChildDto } from './dto/update-child.dto';
import { Child, ChildDocument } from './entities/child.entity';
import { ParentService } from 'src/Parent/parent.service';
import { ParentChildMasterService } from 'common/parent-child-master.service';

@Injectable()
export class ChildService extends ParentChildMasterService<
  Child,
  ChildAudit,
  CreateChildDto,
  UpdateChildDto,
  FilterChildDto,
  AuditFilterChildDto,
  ParentService
> {
  constructor(
    @InjectModel(Child.name)
    protected currentModel: Model<ChildDocument>,
    @InjectModel(ChildAudit.name)
    protected auditModel: Model<ChildAuditDocument>,
    protected readonly parentService: ParentService,
  ) {
    super(currentModel, auditModel, parentService);
  }
}
