import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { MasterService } from 'common/master.service';
import { Model } from 'mongoose';
import { CreateTemplateDto } from './dto/create-template.dto';
import { FilterTemplateDto } from './dto/filter-template.dto';
import { UpdateTemplateDto } from './dto/update-template.dto';
import { Template, TemplateDocument } from './entities/template.entity';

@Injectable()
export class TemplateService extends MasterService<
  Template,
  Template,
  CreateTemplateDto,
  UpdateTemplateDto,
  FilterTemplateDto,
  FilterTemplateDto
> {
  constructor(
    @InjectModel(Template.name)
    protected currentModel: Model<TemplateDocument>,
    @InjectModel(Template.name)
    protected auditModel: Model<TemplateDocument>,
  ) {
    super(currentModel, auditModel);
  }
}
