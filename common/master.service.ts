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
  constructor(
    protected currentModel: any,
    protected auditModel: any,
    protected advanceFilter: any = null,
  ) {
    this.currentModel = currentModel;
    this.auditModel = auditModel;
    this.advanceFilter = advanceFilter;
  }

  create(createDto: CreateDto): Promise<Model> {
    console.log('Create records');
    const { username, user_id, organization_id } = createDto;
    const model = new this.currentModel({
      ...createDto,
      ref_id: uuid(),
      created_by: user_id,
      created_by_name: username,
      updated_by: user_id,
      updated_by_name: username,
      updated_datetime_utc: new Date(),
      organization_id: organization_id,
    });
    // Generate audit
    const audit = new this.auditModel(generateAudit(model, ''));
    audit.save();
    return model.save();
  }

  async findAll(filterDto: FilterDto = null): Promise<Model[]> {
    console.log(`This action returns all template`);
    if (filterDto == null)
      return this.currentModel.find({}, { _id: 0, __v: 0 }).lean();
  }

  async count(filterDto: FilterDto = null): Promise<Model[]> {
    console.log(`This action count all template`);
    if (filterDto == null) return this.currentModel.count();
  }

  async findOne(ref_id: string) {
    console.log(`This action returns a #${ref_id} template`);
    const record = await this.currentModel.findOne(
      { ref_id },
      { _id: 0, __v: 0 },
    );
    if (!record) throw new NotFoundException(ref_id);
    return record;
  }

  async update(ref_id: string, UpdateDto: UpdateDto) {
    console.log(`This action updates a #${ref_id} template`);
    let model = await this.currentModel.findOne({ ref_id });
    if (!model) throw new NotFoundException('Record not found');
    const updatedModel = Object.assign({}, model._doc, UpdateDto);
    const auditResult = generateUpdateAudit(model, updatedModel);
    if (auditResult.changes.length > 0) {
      const audit = new this.auditModel(auditResult);
      audit.save();
      model = Object.assign(model, UpdateDto);
      model.updated_by = updatedModel.updated_by;
      model.updated_by_name = updatedModel.updated_by_name;
      model.updated_datetime_utc = updatedModel.updated_datetime_utc;
    }
    return model.save();
  }

  remove(ref_id: string) {
    console.log(`This action removes a #${ref_id} template`);
    const result = this.currentModel.findOneAndDelete({ ref_id });
    return result;
  }

  //Audit service
  async auditAll(filterDto: AuditFilterDto = null): Promise<Audit[]> {
    console.log(`This action returns all audit records`);
    if (filterDto == null) return this.auditModel.find({}, { _id: 0, __v: 0 });
  }
}
