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
  import { TemplatePascalService } from './template-kebab-case.service';
  import { CreateTemplatePascalDto } from './dto/create-template-kebab-case.dto';
  import { UpdateTemplatePascalDto } from './dto/update-template-kebab-case.dto';
  import { ApiHeader, ApiParam, ApiTags } from '@nestjs/swagger';
  import { AuditFilterTemplatePascalDto } from './audit/dto/filter-template-kebab-case.dto';
  import { FilterTemplatePascalDto } from './dto/filter-template-kebab-case.dto';
  
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
  @ApiTags('templateCamelCase')
  @Controller('templateCamelCase')
  export class TemplatePascalController {
    constructor(
      private readonly templateCamelCaseService: TemplatePascalService,
    ) {}
  
    @Get(':header_ref_id/audit')
    @ApiParam({
      name: 'header_ref_id',
      description: 'TemplatePascalPascal ref id',
      type: 'string',
    })
    auditAll(
      @Param('header_ref_id') headerRefId: string,
      @Query() query: AuditFilterTemplatePascalDto,
    ) {
      query.header_ref_id = headerRefId;
      return this.templateCamelCaseService.auditAll(query);
    }
  
    @Get(':header_ref_id/audit/count')
    @ApiParam({
      name: 'header_ref_id',
      description: 'TemplatePascalPascal ref id',
      type: 'string',
    })
    auditAllCount(
      @Param('header_ref_id') headerRefId: string,
      @Query() query: AuditFilterTemplatePascalDto,
    ) {
      query.header_ref_id = headerRefId;
      return this.templateCamelCaseService.countFilteredAudit(query);
    }
  
    @Post()
    create(@Body() createTemplatePascalDto: CreateTemplatePascalDto) {
      console.log('createDto', createTemplatePascalDto);
      return this.templateCamelCaseService.create(createTemplatePascalDto);
    }
  
    @Get()
    findAll(@Query() query: FilterTemplatePascalDto) {
      console.log(query);
      return this.templateCamelCaseService.findAll(query);
    }
  
    @Get('/count')
    count(@Query() query: FilterTemplatePascalDto) {
      return this.templateCamelCaseService.countFiltered(query);
    }
  
    @Get(':ref_id')
    findOne(@Param('ref_id') ref_id: string) {
      return this.templateCamelCaseService.findOne(ref_id);
    }
  
    @Patch(':ref_id')
    update(
      @Param('ref_id') ref_id: string,
      @Body() updateTemplatePascalDto: UpdateTemplatePascalDto,
    ) {
      return this.templateCamelCaseService.update(
        ref_id,
        updateTemplatePascalDto,
      );
    }
  
    @Delete(':ref_id')
    remove(@Param('ref_id') ref_id: string) {
      return this.templateCamelCaseService.remove(ref_id);
    }
  }
  