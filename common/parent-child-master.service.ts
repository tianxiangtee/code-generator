import { Injectable, NotFoundException } from '@nestjs/common';
import { CommonFilterDto, CommonRequestDto } from './constant/common-dto';
import { MasterService } from './master.service';
import { CommonParentSchema } from './constant/common-schema';
import { generateAudit, generateDeleteAudit, generateUpdateAudit } from './audit/generateAudit';
import { v4 as uuid } from 'uuid';

@Injectable()
export class ParentChildMasterService<
  Model extends CommonParentSchema,
  Audit,
  CreateDto extends CommonRequestDto,
  UpdateDto extends CreateDto,
  FilterDto extends CommonFilterDto,
  AuditFilterDto extends CommonFilterDto,
  ParentService extends ParentChildMasterService<
    Model,
    Audit,
    CreateDto,
    UpdateDto,
    FilterDto,
    AuditFilterDto,
    null
  >,
> extends MasterService<
  Model,
  Audit,
  CreateDto,
  UpdateDto,
  FilterDto,
  AuditFilterDto
> {
  constructor(
    protected currentModel: any,
    protected auditModel: any,
    protected parentService: ParentService,
  ) {
    super(currentModel, auditModel);
  }

  // Update the child count and perform child validation
  async updateChildCountAndValidate(
    parentId: string,
    count: number,
    isChildModelReady: boolean,
    errorMsg: string,
  ): Promise<Model> {
    const document = await this.currentModel.findOneAndUpdate(
      { ref_id: parentId },
      { $inc: { child_count: count } },
      { new: true },
    );

    if (!document) {
      throw new Error('Document not found');
    }

    this.validateChild(document, isChildModelReady, errorMsg, parentId);

    return document;
  }

  // Perform child validation and update the parent's child count
  private async validateChild(
    document: Model,
    isChildModelReady: boolean,
    errorMsg: string,
    parentId: string,
  ): Promise<void> {
    const updateDto: UpdateDto = {} as UpdateDto;
    const atLeastOneChild = 'At least one child';
    updateDto.error_fields = document.error_fields;

    if (isChildModelReady === false) {
      // Remove "At least one child" error field if child is not ready
      updateDto.error_fields = updateDto.error_fields.filter(
        (x) => x !== atLeastOneChild,
      );

      if (!document.error_fields.includes(errorMsg)) {
        // Add the specific child error message
        updateDto.error_fields.push(errorMsg);
      }
    } else if (document.child_count === 0) {
      // Remove specific child error message if child count is 0
      updateDto.error_fields = updateDto.error_fields.filter(
        (x) => x !== errorMsg,
      );

      if (!document.error_fields.includes(atLeastOneChild)) {
        // Add "At least one child" error field
        updateDto.error_fields.push(atLeastOneChild);
      }
    } else {
      // Remove both specific child error message and "At least one child" error field
      updateDto.error_fields = updateDto.error_fields.filter(
        (x) => x !== errorMsg && x !== atLeastOneChild,
      );
    }

    updateDto.is_ready_to_submit = !(updateDto.error_fields.length > 0);

    await this.update(parentId, updateDto, true);
  }

  // Create a child and update the parent's child count and perform validation
  async child_create(createDto: CreateDto): Promise<Model> {
    //const model = await this.create(createDto);
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
    const auditResult = generateAudit(model, '');
    const audit = new this.auditModel(auditResult);
    await Promise.all([model.save(), audit.save()]);
    //
    // save into parent audit
    auditResult.header_ref_id = model.header_ref_id
    this.parentService.createAudit(auditResult);

    await this.parentService.updateChildCountAndValidate(
      model.header_ref_id,
      1,
      model.is_ready_to_submit,
      'invalid_child',
    );
    return model;
  }

  async child_remove(ref_id: string): Promise<Model> {
    const model = await this.currentModel.findOneAndDelete({ ref_id });
  
    if (!model) {
      throw new NotFoundException(`Record not found with ref_id: ${ref_id}`);
    }
  
    const auditResult = generateDeleteAudit(model, '');
    const audit = new this.auditModel(auditResult);
    await Promise.all([audit.save()]);
    
    auditResult.header_ref_id = model.header_ref_id;  
    this.parentService.createAudit(auditResult);
  
    await this.parentService.updateChildCountAndValidate(
      model.header_ref_id,
      -1,
      true,
      'invalid_child',
    );
  
    return model;
  }
  

  // Update a child and update the parent's child count and perform validation
  async child_update(ref_id: string, updateDto: UpdateDto): Promise<Model> {
    updateDto.is_ready_to_submit = updateDto.error_fields && updateDto.error_fields.length > 0 ? false: true;
    // const model = await this.update(ref_id, updateDto);
    let model = await this.currentModel.findOne({ ref_id });
    if (!model)
      throw new NotFoundException(`Record not found with ref_id: ${ref_id}`);
    const updatedModel = Object.assign({}, model._doc, updateDto);
    const auditResult = generateUpdateAudit(model, updatedModel);
    if (auditResult.changes.length > 0) {
      const audit = new this.auditModel(auditResult);
      await audit.save();
      model = Object.assign(model, updateDto);
      model.updated_by = updatedModel.updated_by;
      model.updated_by_name = updatedModel.updated_by_name;
      model.updated_datetime_utc = updatedModel.updated_datetime_utc;
    }
    await model.save();
    // save into parent audit
    auditResult.header_ref_id = model.header_ref_id
    this.parentService.createAudit(auditResult);
    this.parentService.updateChildCountAndValidate(
      model.header_ref_id,
      0,
      model.is_ready_to_submit,
      'invalid_child',
    );
    return model;
  }
}
