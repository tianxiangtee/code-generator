import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { MasterService } from 'common/master.service';
import { Model } from 'mongoose';
import { AuditFilterTemp123ProfileDto } from './audit/dto/filter-temp-123-profile.dto';
import {
  Temp123ProfileAudit,
  Temp123ProfileAuditDocument,
} from './audit/entities/temp-123-profile.entity';
import { CreateTemp123ProfileDto } from './dto/create-temp-123-profile.dto';
import { FilterTemp123ProfileDto } from './dto/filter-temp-123-profile.dto';
import { UpdateTemp123ProfileDto } from './dto/update-temp-123-profile.dto';
import {
  Temp123Profile,
  Temp123ProfileDocument,
} from './entities/temp-123-profile.entity';

@Injectable()
export class Temp123ProfileService extends MasterService<
  Temp123Profile,
  Temp123ProfileAudit,
  CreateTemp123ProfileDto,
  UpdateTemp123ProfileDto,
  FilterTemp123ProfileDto,
  AuditFilterTemp123ProfileDto
> {
  constructor(
    @InjectModel(Temp123Profile.name)
    protected currentModel: Model<Temp123ProfileDocument>,
    @InjectModel(Temp123ProfileAudit.name)
    protected auditModel: Model<Temp123ProfileAuditDocument>,
  ) {
    super(currentModel, auditModel);
  }
}
