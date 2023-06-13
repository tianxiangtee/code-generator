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
import { ChildService } from './child.service';
import { CreateChildDto } from './dto/create-child.dto';
import { UpdateChildDto } from './dto/update-child.dto';
import { ApiHeader, ApiParam, ApiTags } from '@nestjs/swagger';
import { AuditFilterChildDto } from './audit/dto/filter-child.dto';
import { FilterChildDto } from './dto/filter-child.dto';

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
@ApiTags('child')
@Controller('child')
export class ChildController {
  constructor(
    private readonly childService: ChildService,
  ) {}

  @Get(':header_ref_id/audit')
  @ApiParam({
    name: 'header_ref_id',
    description: 'ChildPascal ref id',
    type: 'string',
  })
  auditAll(
    @Param('header_ref_id') headerRefId: string,
    @Query() query: AuditFilterChildDto,
  ) {
    query.header_ref_id = headerRefId;
    return this.childService.auditAll(query);
  }

  @Get(':header_ref_id/audit/count')
  @ApiParam({
    name: 'header_ref_id',
    description: 'ChildPascal ref id',
    type: 'string',
  })
  auditAllCount(
    @Param('header_ref_id') headerRefId: string,
    @Query() query: AuditFilterChildDto,
  ) {
    query.header_ref_id = headerRefId;
    return this.childService.countFilteredAudit(query);
  }

  @Post()
  create(@Body() createChildDto: CreateChildDto) {
    console.log('createDto', createChildDto);
    return this.childService.create(createChildDto);
  }

  @Get()
  findAll(@Query() query: FilterChildDto) {
    console.log(query);
    return this.childService.findAll(query);
  }

  @Get('/count')
  count(@Query() query: FilterChildDto) {
    return this.childService.countFiltered(query);
  }

  @Get(':ref_id')
  findOne(@Param('ref_id') ref_id: string) {
    return this.childService.findOne(ref_id);
  }

  @Patch(':ref_id')
  update(
    @Param('ref_id') ref_id: string,
    @Body() updateChildDto: UpdateChildDto,
  ) {
    return this.childService.update(
      ref_id,
      updateChildDto,
    );
  }

  @Delete(':ref_id')
  remove(@Param('ref_id') ref_id: string) {
    return this.childService.remove(ref_id);
  }
}
