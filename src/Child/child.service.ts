import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { MasterService } from 'common/master.service';
import { Model } from 'mongoose';
import { AuditFilterChildDto } from './audit/dto/filter-child.dto';
import { ChildAudit, ChildAuditDocument } from './audit/entities/child.entity';
import { CreateChildDto } from './dto/create-child.dto';
import { FilterChildDto } from './dto/filter-child.dto';
import { UpdateChildDto } from './dto/update-child.dto';
import { Child, ChildDocument } from './entities/child.entity';
import { v4 as uuid } from 'uuid';
import {
  generateAudit,
  generateUpdateAudit,
} from '../../common/audit/generateAudit';
import { ParentService } from 'src/Parent/parent.service';
import { Parent, ParentDocument } from 'src/Parent/entities/parent.entity';

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
    private readonly parentService: ParentService,
  ) {
    super(currentModel, auditModel);
  }

  async child_create(createDto: CreateChildDto): Promise<Child> {
    const model = await this.create(createDto);
    await this.parentService.updateChildCountAndValidate(
      model.header_ref_id,
      1,
      model.is_ready_to_submit,
      'invalid_child',
    );
    return model;
  }

  async child_remove(ref_id: string): Promise<Child> {
    const model = await this.remove(ref_id);
    await this.parentService.updateChildCountAndValidate(
      model.header_ref_id,
      -1,
      true,
      'invalid_child',
    );
    return model;
  }

  async child_update(
    ref_id: string,
    updateDto: UpdateChildDto,
  ): Promise<Child> {
    updateDto.is_ready_to_submit = updateDto.error_fields.length > 0;
    const model = await this.update(ref_id, updateDto);
    this.parentService.updateChildCountAndValidate(
      model.header_ref_id,
      0,
      model.is_ready_to_submit,
      'invalid_child',
    );
    return model;
  }
}
