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
  import { Temp123RequestService } from './temp-123-request.service';
  import { CreateTemp123RequestDto } from './dto/create-temp-123-request.dto';
  import { UpdateTemp123RequestDto } from './dto/update-temp-123-request.dto';
  import { ApiHeader, ApiParam, ApiTags } from '@nestjs/swagger';
  import { AuditFilterTemp123RequestDto } from './audit/dto/filter-temp-123-request.dto';
  import { FilterTemp123RequestDto } from './dto/filter-temp-123-request.dto';
  
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
  @ApiTags('temp123Request')
  @Controller('temp123Request')
  export class Temp123RequestController {
    constructor(
      private readonly temp123RequestService: Temp123RequestService,
    ) {}
  
    @Get(':header_ref_id/audit')
    @ApiParam({
      name: 'header_ref_id',
      description: 'Temp123RequestPascal ref id',
      type: 'string',
    })
    auditAll(
      @Param('header_ref_id') headerRefId: string,
      @Query() query: AuditFilterTemp123RequestDto,
    ) {
      query.header_ref_id = headerRefId;
      return this.temp123RequestService.auditAll(query);
    }
  
    @Get(':header_ref_id/audit/count')
    @ApiParam({
      name: 'header_ref_id',
      description: 'Temp123RequestPascal ref id',
      type: 'string',
    })
    auditAllCount(
      @Param('header_ref_id') headerRefId: string,
      @Query() query: AuditFilterTemp123RequestDto,
    ) {
      query.header_ref_id = headerRefId;
      return this.temp123RequestService.countFilteredAudit(query);
    }
  
    @Post()
    create(@Body() createTemp123RequestDto: CreateTemp123RequestDto) {
      console.log('createDto', createTemp123RequestDto);
      return this.temp123RequestService.create(createTemp123RequestDto);
    }
  
    @Get()
    findAll(@Query() query: FilterTemp123RequestDto) {
      console.log(query);
      return this.temp123RequestService.findAll(query);
    }
  
    @Get('/count')
    count(@Query() query: FilterTemp123RequestDto) {
      return this.temp123RequestService.countFiltered(query);
    }
  
    @Get(':ref_id')
    findOne(@Param('ref_id') ref_id: string) {
      return this.temp123RequestService.findOne(ref_id);
    }
  
    @Patch(':ref_id')
    update(
      @Param('ref_id') ref_id: string,
      @Body() updateTemp123RequestDto: UpdateTemp123RequestDto,
    ) {
      return this.temp123RequestService.update(
        ref_id,
        updateTemp123RequestDto,
      );
    }
  
    @Delete(':ref_id')
    remove(@Param('ref_id') ref_id: string) {
      return this.temp123RequestService.remove(ref_id);
    }
  }
  