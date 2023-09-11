import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { generateAudit, generateUpdateAudit } from './audit/generateAudit';
import { CommonDto, CommonFilterDto } from './constant/common-dto';

@Injectable()
export class MasterService<
  Model,
  Audit,
  CreateDto extends CommonDto,
  UpdateDto,
  FilterDto extends CommonFilterDto,
  AuditFilterDto extends CommonFilterDto,
> {
  protected currentModel: any;
  protected auditModel: any;
  protected advanceFilter: any;

  constructor(currentModel: any, auditModel: any, advanceFilter: any = null) {
    this.currentModel = currentModel;
    this.auditModel = auditModel;
    this.advanceFilter = advanceFilter;
  }

  async createAudit(auditResult:any) {
    const audit = new this.auditModel(auditResult);
    await audit.save();
  }

  async create(createDto: CreateDto): Promise<Model> {
    const { username, user_id, organization_id } = createDto;
    const model = new this.currentModel({
      ...createDto,
      ref_id: uuid(),
      created_by: user_id,
      created_by_name: username,
      updated_by: user_id,
      updated_by_name: username,
      updated_datetime_utc: new Date(),
      organization_id,
    });
    const audit = new this.auditModel(generateAudit(model, ''));
    await Promise.all([model.save(), audit.save()]);
    return model;
  }

  // async findAll(filterDto: FilterDto = null): Promise<Model[]> {
  //   const filter = filterDto || {};
  //   return this.currentModel.find(filter, { _id: 0, __v: 0 }).lean();
  // }
  async findAll(filterDto: FilterDto = null): Promise<Model[]> {
    const filter = filterDto || {};
    let query = this.currentModel.find(filter, { _id: 0, __v: 0 }).lean();
    if (filterDto == null) return query;

    if (filterDto.offset) {
      query = query.skip(filterDto.offset);
    }

    if (filterDto.limit) {
      query = query.limit(filterDto.limit);
    }

    if (filterDto.sortBy && filterDto.sortDirection) {
      const sort = {};
      sort[filterDto.sortBy] = filterDto.sortDirection === 'asc' ? 1 : -1;
      query = query.sort(sort);
    }

    return query.exec();
  }

  async countFiltered(filterDto: FilterDto = null): Promise<number> {
    const filter = filterDto || {};
    const count = await this.currentModel.countDocuments(filter);
    const { limit = 0, offset = 0 } = filterDto || {};
    return limit ? Math.min(count - offset, limit) : count - offset;
  }

  async findOne(ref_id: string): Promise<Model> {
    const record = await this.currentModel.findOne(
      { ref_id },
      { _id: 0, __v: 0 },
    );
    if (!record)
      throw new NotFoundException(`Record not found with ref_id: ${ref_id}`);
    return record;
  }

  async update(ref_id: string, updateDto: UpdateDto, skipAudit: boolean = false): Promise<Model> {
    const model = await this.currentModel.findOneAndUpdate(
      { ref_id },
      { $set: updateDto }, // Use $set to update specific fields
      { new: true },
    );
  
    if (!model) {
      throw new NotFoundException(`Record not found with ref_id: ${ref_id}`);
    }
  
    const updatedModel = model.toObject(); // Convert to plain JavaScript object
    const auditResult = generateUpdateAudit(model, updatedModel);
  
    if (auditResult.changes.length > 0 && !skipAudit) {
      const audit = new this.auditModel(auditResult);
      await audit.save();
    }
  
    return model;
  }
  

  async remove(ref_id: string): Promise<Model> {
    const result = await this.currentModel.findOneAndDelete({ ref_id });
    if (!result)
      throw new NotFoundException(`Record not found with ref_id: ${ref_id}`);
    return result;
  }

  async auditAll(filterDto: AuditFilterDto = null): Promise<Audit[]> {
    const filter = filterDto || {};
    let query = this.auditModel.find(filter, { _id: 0, __v: 0 }).lean();

    if (filterDto.offset) {
      query = query.skip(filterDto.offset);
    }

    if (filterDto.limit) {
      query = query.limit(filterDto.limit);
    }

    if (filterDto.sortBy && filterDto.sortDirection) {
      const sort = {};
      sort[filterDto.sortBy] = filterDto.sortDirection === 'asc' ? 1 : -1;
      query = query.sort(sort);
    }

    return query.exec();
  }
  async countFilteredAudit(filterDto: AuditFilterDto = null): Promise<number> {
    const filter = filterDto || {};
    const count = await this.auditModel.countDocuments(filter);
    const { limit = 0, offset = 0 } = filterDto || {};
    return limit ? Math.min(count - offset, limit) : count - offset;
  }
}
