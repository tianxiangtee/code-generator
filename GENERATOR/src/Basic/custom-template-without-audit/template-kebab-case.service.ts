import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { MasterService } from 'common/master.service';
import { Model } from 'mongoose';
import { CreateTemplatePascalDto } from './dto/create-template-kebab-case.dto';
import { FilterTemplatePascalDto } from './dto/filter-template-kebab-case.dto';
import { UpdateTemplatePascalDto } from './dto/update-template-kebab-case.dto';
import {
  TemplatePascal,
  TemplatePascalDocument,
} from './entities/template-kebab-case.entity';

@Injectable()
export class TemplatePascalService extends MasterService<
  TemplatePascal,
  null,
  CreateTemplatePascalDto,
  UpdateTemplatePascalDto,
  FilterTemplatePascalDto,
  null
> {
  constructor(
    @InjectModel(TemplatePascal.name)
    protected currentModel: Model<TemplatePascalDocument>,
  ) {
    super(currentModel, null);
  }
}
