import { Injectable } from '@nestjs/common';

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

  create(
    createDto: CreateDto,
    cloneSourceRefId = null,
    cloneSourceInfo = null,
  ): Promise<Model> {
    console.log('Create records');
    const model = new this.currentModel({ ...createDto });
    return model.save();
  }

  findAll() {
    return `This action returns all template`;
  }

  findOne(id: number) {
    return `This action returns a #${id} template`;
  }

  update(id: number, UpdateDto: UpdateDto) {
    return `This action updates a #${id} template`;
  }

  remove(id: number) {
    return `This action removes a #${id} template`;
  }
}
