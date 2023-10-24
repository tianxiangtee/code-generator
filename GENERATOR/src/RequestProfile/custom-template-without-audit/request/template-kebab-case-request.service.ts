import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { MasterService } from 'common/master.service';
import { Model } from 'mongoose';
import { CreateTemplatePascalRequestDto } from './dto/create-template-kebab-case-request.dto';
import { FilterTemplatePascalRequestDto } from './dto/filter-template-kebab-case-request.dto';
import { UpdateTemplatePascalRequestDto } from './dto/update-template-kebab-case-request.dto';
import {
  TemplatePascalRequest,
  TemplatePascalRequestDocument,
} from './entities/template-kebab-case-request.entity';

@Injectable()
export class TemplatePascalRequestService extends MasterService<
  TemplatePascalRequest,
  null,
  CreateTemplatePascalRequestDto,
  UpdateTemplatePascalRequestDto,
  FilterTemplatePascalRequestDto,
  null
> {
  constructor(
    @InjectModel(TemplatePascalRequest.name)
    protected currentModel: Model<TemplatePascalRequestDocument>
  ) {
    super(currentModel, null);
  }
}
