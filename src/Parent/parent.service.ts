import { Injectable, ParseUUIDPipe } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { MasterService } from 'common/master.service';
import { Model } from 'mongoose';
import { AuditFilterParentDto } from './audit/dto/filter-parent.dto';
import {
  ParentAudit,
  ParentAuditDocument,
} from './audit/entities/parent.entity';
import { CreateParentDto } from './dto/create-parent.dto';
import { FilterParentDto } from './dto/filter-parent.dto';
import { UpdateParentDto } from './dto/update-parent.dto';
import { Parent, ParentDocument } from './entities/parent.entity';
import { ParentChildMasterService } from 'common/parent-child-master.service';

@Injectable()
export class ParentService extends ParentChildMasterService<
  Parent,
  ParentAudit,
  CreateParentDto,
  UpdateParentDto,
  FilterParentDto,
  AuditFilterParentDto,
  null
> {
  constructor(
    @InjectModel(Parent.name)
    protected currentModel: Model<ParentDocument>,
    @InjectModel(ParentAudit.name)
    protected auditModel: Model<ParentAuditDocument>,
  ) {
    super(currentModel, auditModel, null);
  }
}
