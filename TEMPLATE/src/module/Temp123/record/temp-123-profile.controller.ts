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
  import { Temp123ProfileService } from './temp-123-profile.service';
  import { CreateTemp123ProfileDto } from './dto/create-temp-123-profile.dto';
  import { UpdateTemp123ProfileDto } from './dto/update-temp-123-profile.dto';
  import { ApiHeader, ApiParam, ApiTags } from '@nestjs/swagger';
  import { AuditFilterTemp123ProfileDto } from './audit/dto/filter-temp-123-profile.dto';
  import { FilterTemp123ProfileDto } from './dto/filter-temp-123-profile.dto';
  
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
  @ApiTags('temp123Profile')
  @Controller('temp123Profile')
  export class Temp123ProfileController {
    constructor(
      private readonly temp123ProfileService: Temp123ProfileService,
    ) {}
  
    @Get(':header_ref_id/audit')
    @ApiParam({
      name: 'header_ref_id',
      description: 'Temp123ProfilePascal ref id',
      type: 'string',
    })
    auditAll(
      @Param('header_ref_id') headerRefId: string,
      @Query() query: AuditFilterTemp123ProfileDto,
    ) {
      query.header_ref_id = headerRefId;
      return this.temp123ProfileService.auditAll(query);
    }
  
    @Get(':header_ref_id/audit/count')
    @ApiParam({
      name: 'header_ref_id',
      description: 'Temp123ProfilePascal ref id',
      type: 'string',
    })
    auditAllCount(
      @Param('header_ref_id') headerRefId: string,
      @Query() query: AuditFilterTemp123ProfileDto,
    ) {
      query.header_ref_id = headerRefId;
      return this.temp123ProfileService.countFilteredAudit(query);
    }
  
    @Post()
    create(@Body() createTemp123ProfileDto: CreateTemp123ProfileDto) {
      console.log('createDto', createTemp123ProfileDto);
      return this.temp123ProfileService.create(createTemp123ProfileDto);
    }
  
    @Get()
    findAll(@Query() query: FilterTemp123ProfileDto) {
      console.log(query);
      return this.temp123ProfileService.findAll(query);
    }
  
    @Get('/count')
    count(@Query() query: FilterTemp123ProfileDto) {
      return this.temp123ProfileService.countFiltered(query);
    }
  
    @Get(':ref_id')
    findOne(@Param('ref_id') ref_id: string) {
      return this.temp123ProfileService.findOne(ref_id);
    }
  
    @Patch(':ref_id')
    update(
      @Param('ref_id') ref_id: string,
      @Body() updateTemp123ProfileDto: UpdateTemp123ProfileDto,
    ) {
      return this.temp123ProfileService.update(
        ref_id,
        updateTemp123ProfileDto,
      );
    }
  
    @Delete(':ref_id')
    remove(@Param('ref_id') ref_id: string) {
      return this.temp123ProfileService.remove(ref_id);
    }
  }
  