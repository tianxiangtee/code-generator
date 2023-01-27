import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
@Injectable()
export class MasterService<
  Model,
  Audit,
  CreateDto,
  UpdateDto,
  FilterDto,
  AuditFilterDto,
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
    const model = new this.currentModel({ ...createDto, ref_id: uuid() });
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
    model = Object.assign(model, UpdateDto);
    return model.save();
  }

  remove(ref_id: string) {
    console.log(`This action removes a #${ref_id} template`);
    const result = this.currentModel.findOneAndDelete({ ref_id });
    return result;
  }
}
