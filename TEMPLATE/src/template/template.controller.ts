import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { TemplateService } from './template.service';
import { CreateTemplateDto } from './dto/create-template.dto';
import { UpdateTemplateDto } from './dto/update-template.dto';
import { ApiHeader, ApiParam, ApiTags } from '@nestjs/swagger';
import { AuditFilterTemplateDto } from './audit/dto/filter-template.dto';
import { FilterTemplateDto } from './dto/filter-template.dto';

@ApiHeader({
  name: 'servicekey',
  description: 'Service Key for API',
  schema: { default: `${process.env.SERVICE_KEY}` },
})
@ApiHeader({ name: 'user_id', description: 'User ID of executions' })
@ApiHeader({ name: 'username', description: 'User Name of executions' })
@ApiHeader({
  name: 'organization_id',
  description: 'Organization of executions',
})
@ApiTags('template')
@Controller('template')
export class TemplateController {
  constructor(private readonly templateService: TemplateService) {}

  @Get(':header_ref_id/audit')
  @ApiParam({
    name: 'header_ref_id',
    description: 'Template ref id',
    type: 'string',
  })
  auditAll(
    @Param('header_ref_id') headerRefId: string,
    @Query() query: AuditFilterTemplateDto,
  ) {
    query.header_ref_id = headerRefId;
    return this.templateService.auditAll(query);
  }

  @Get(':header_ref_id/audit/count')
  @ApiParam({
    name: 'header_ref_id',
    description: 'Template ref id',
    type: 'string',
  })
  auditAllCount(
    @Param('header_ref_id') headerRefId: string,
    @Query() query: AuditFilterTemplateDto,
  ) {
    query.header_ref_id = headerRefId;
    return this.templateService.countFilteredAudit(query);
  }

  @Post()
  create(@Body() createTemplateDto: CreateTemplateDto) {
    console.log('createDto', createTemplateDto);
    return null;
    return this.templateService.create(createTemplateDto);
  }

  @Get()
  findAll(@Query() query: FilterTemplateDto) {
    console.log(query);
    return this.templateService.findAll(query);
  }

  @Get('/count')
  count(@Query() query: FilterTemplateDto) {
    return this.templateService.countFiltered(query);
  }

  @Get(':ref_id')
  findOne(@Param('ref_id') ref_id: string) {
    return this.templateService.findOne(ref_id);
  }

  @Patch(':ref_id')
  update(
    @Param('ref_id') ref_id: string,
    @Body() updateTemplateDto: UpdateTemplateDto,
  ) {
    return this.templateService.update(ref_id, updateTemplateDto);
  }

  @Delete(':ref_id')
  remove(@Param('ref_id') ref_id: string) {
    return this.templateService.remove(ref_id);
  }
}
