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
  import { TemplatePascalRecordService } from './template-kebab-case-record.service';
  import { CreateTemplatePascalRecordDto } from './dto/create-template-kebab-case-record.dto';
  import { UpdateTemplatePascalRecordDto } from './dto/update-template-kebab-case-record.dto';
  import { ApiHeader, ApiParam, ApiTags } from '@nestjs/swagger';
  import { AuditFilterTemplatePascalRecordDto } from './audit/dto/filter-template-kebab-case-record.dto';
  import { FilterTemplatePascalRecordDto } from './dto/filter-template-kebab-case-record.dto';
  
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
  @ApiTags('templateCamelCaseRecord')
  @Controller('templateCamelCaseRecord')
  export class TemplatePascalRecordController {
    constructor(
      private readonly templateCamelCaseRecordService: TemplatePascalRecordService,
    ) {}

    @Get(':header_ref_id/audit')
    @ApiParam({
      name: 'header_ref_id',
      description: 'TemplatePascalPascal ref id',
      type: 'string',
    })
    auditAll(
      @Param('header_ref_id') headerRefId: string,
      @Query() query: AuditFilterTemplatePascalRecordDto,
    ) {
      query.header_ref_id = headerRefId;
      return this.templateCamelCaseRecordService.auditAll(query);
    }
    
    @Post()
    create(@Body() createTemplatePascalRecordDto: CreateTemplatePascalRecordDto) {
      console.log('createDto', createTemplatePascalRecordDto);
      return this.templateCamelCaseRecordService.create(createTemplatePascalRecordDto);
    }
  
    @Get()
    findAll(@Query() query: FilterTemplatePascalRecordDto) {
      console.log(query);
      return this.templateCamelCaseRecordService.findAll(query);
    }
  
    @Get('/count')
    count(@Query() query: FilterTemplatePascalRecordDto) {
      return this.templateCamelCaseRecordService.countFiltered(query);
    }
  
    @Get(':ref_id')
    findOne(@Param('ref_id') ref_id: string) {
      return this.templateCamelCaseRecordService.findOne(ref_id);
    }
  
    @Patch(':ref_id')
    update(
      @Param('ref_id') ref_id: string,
      @Body() updateTemplatePascalRecordDto: UpdateTemplatePascalRecordDto,
    ) {
      return this.templateCamelCaseRecordService.update(
        ref_id,
        updateTemplatePascalRecordDto,
      );
    }
  
    @Delete(':ref_id')
    remove(@Param('ref_id') ref_id: string) {
      return this.templateCamelCaseRecordService.remove(ref_id);
    }
  }
  