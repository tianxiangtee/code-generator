import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { MasterService } from 'common/master.service';
import { Model } from 'mongoose';
import { CreateTemplatePascalRecordDto } from './dto/create-template-kebab-case-record.dto';
import { FilterTemplatePascalRecordDto } from './dto/filter-template-kebab-case-record.dto';
import { UpdateTemplatePascalRecordDto } from './dto/update-template-kebab-case-record.dto';
import {
  TemplatePascalRecord,
  TemplatePascalRecordDocument,
} from './entities/template-kebab-case-record.entity';

@Injectable()
export class TemplatePascalRecordService extends MasterService<
  TemplatePascalRecord,
  null,
  CreateTemplatePascalRecordDto,
  UpdateTemplatePascalRecordDto,
  FilterTemplatePascalRecordDto,
  null
> {
  constructor(
    @InjectModel(TemplatePascalRecord.name)
    protected currentModel: Model<TemplatePascalRecordDocument>,
  ) {
    super(currentModel, null);
  }
}
