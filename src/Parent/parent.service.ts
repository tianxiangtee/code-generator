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

@Injectable()
export class ParentService extends MasterService<
  Parent,
  ParentAudit,
  CreateParentDto,
  UpdateParentDto,
  FilterParentDto,
  AuditFilterParentDto
> {
  constructor(
    @InjectModel(Parent.name)
    protected currentModel: Model<ParentDocument>,
    @InjectModel(ParentAudit.name)
    protected auditModel: Model<ParentAuditDocument>,
  ) {
    super(currentModel, auditModel);
  }

  // async findOneAndUpdateChildCount(id: string, count: number): Promise<Parent> {
  //   const document = await this.currentModel.findOne({ ref_id: id });
  //   if (!document) {
  //     throw new Error('Document not found');
  //   }
  //   document.child_count += count;
  //   await document.save();
  //   return document;
  // }

  // async validateChildren(
  //   parentId: string,
  //   isChildModelReady: boolean,
  //   errorMsg: string,
  // ) {
  //   const updateDto = new UpdateParentDto();
  //   const model = await this.findOne(parentId);
  //   updateDto.error_fields = model.error_fields;

  //   if (isChildModelReady == false) {
  //     if (!model.error_fields.includes(errorMsg)) {
  //       updateDto.error_fields.push(errorMsg);
  //     }
  //   } else {
  //     updateDto.error_fields = updateDto.error_fields.filter(
  //       (x) => x !== errorMsg,
  //     );
  //   }
  //   updateDto.is_ready_to_submit = !(updateDto.error_fields.length > 0);
  //   this.update(parentId, updateDto);
  // }

  async updateChildCountAndValidate(
    parentId: string,
    count: number,
    isChildModelReady: boolean,
    errorMsg: string,
  ): Promise<Parent> {
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

  private async validateChild(document, isChildModelReady, errorMsg, parentId) {
    const updateDto = new UpdateParentDto();
    const atLeastOneChild = 'At least one child';
    updateDto.error_fields = document.error_fields;
    if (isChildModelReady === false) {
      updateDto.error_fields = updateDto.error_fields.filter(
        (x) => x !== atLeastOneChild,
      );
      if (!document.error_fields.includes(errorMsg)) {
        updateDto.error_fields.push(errorMsg);
      }
    } else if (document.child_count === 0) {
      updateDto.error_fields = updateDto.error_fields.filter(
        (x) => x !== errorMsg,
      );
      if (!document.error_fields.includes(atLeastOneChild)) {
        updateDto.error_fields.push(atLeastOneChild);
      }
    } else {
      updateDto.error_fields = updateDto.error_fields.filter(
        (x) => x !== errorMsg && x !== atLeastOneChild,
      );
    }

    updateDto.is_ready_to_submit = !(updateDto.error_fields.length > 0);

    await this.update(parentId, updateDto);
  }
}
