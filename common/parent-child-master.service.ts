import { Injectable, NotFoundException } from '@nestjs/common';
import { CommonFilterDto, CommonRequestDto } from './constant/common-dto';
import { MasterService } from './master.service';
import { CommonParentSchema } from './constant/common-schema';
import { generateUpdateAudit } from './audit/generateAudit';

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

    await this.update(parentId, updateDto);
  }

  // Create a child and update the parent's child count and perform validation
  async child_create(createDto: CreateDto): Promise<Model> {
    const model = await this.create(createDto);
    await this.parentService.updateChildCountAndValidate(
      model.header_ref_id,
      1,
      model.is_ready_to_submit,
      'invalid_child',
    );
    return model;
  }

  // Remove a child and update the parent's child count and perform validation
  async child_remove(ref_id: string): Promise<Model> {
    const model = await this.remove(ref_id);
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
    updateDto.is_ready_to_submit = updateDto.error_fields.length > 0;
    // const model = await this.update(ref_id, updateDto);
    let model = await this.currentModel.findOne({ ref_id });
    if (!model)
      throw new NotFoundException(`Record not found with ref_id: ${ref_id}`);
    const updatedModel = Object.assign({}, model._doc, updateDto);
    const auditResult = generateUpdateAudit(model, updatedModel);
    if (auditResult.changes.length > 0) {
      const audit = new this.auditModel(auditResult);
      await audit.save();
    }
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
