import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UnauthorizedException,
} from '@nestjs/common';
import { ParentService } from './parent.service';
import { CreateParentDto } from './dto/create-parent.dto';
import { UpdateParentDto } from './dto/update-parent.dto';
import { ApiHeader, ApiParam, ApiTags } from '@nestjs/swagger';
import { AuditFilterParentDto } from './audit/dto/filter-parent.dto';
import { FilterParentDto } from './dto/filter-parent.dto';

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
@ApiTags('parent')
@Controller('parent')
export class ParentController {
  constructor(
    private readonly parentService: ParentService,
  ) {}

  @Get(':header_ref_id/audit')
  @ApiParam({
    name: 'header_ref_id',
    description: 'ParentPascal ref id',
    type: 'string',
  })
  auditAll(
    @Param('header_ref_id') headerRefId: string,
    @Query() query: AuditFilterParentDto,
  ) {
    query.header_ref_id = headerRefId;
    return this.parentService.auditAll(query);
  }

  @Get(':header_ref_id/audit/count')
  @ApiParam({
    name: 'header_ref_id',
    description: 'ParentPascal ref id',
    type: 'string',
  })
  auditAllCount(
    @Param('header_ref_id') headerRefId: string,
    @Query() query: AuditFilterParentDto,
  ) {
    query.header_ref_id = headerRefId;
    return this.parentService.countFilteredAudit(query);
  }

  @Post()
  create(@Body() createParentDto: CreateParentDto) {
    console.log('createDto', createParentDto);
    return this.parentService.create(createParentDto);
  }

  @Get()
  findAll(@Query() query: FilterParentDto) {
    console.log(query);
    throw new UnauthorizedException()
    return this.parentService.findAll(query);
  }

  @Get('/count')
  count(@Query() query: FilterParentDto) {
    return this.parentService.countFiltered(query);
  }

  @Get(':ref_id')
  findOne(@Param('ref_id') ref_id: string) {
    return this.parentService.findOne(ref_id);
  }

  @Patch(':ref_id')
  update(
    @Param('ref_id') ref_id: string,
    @Body() updateParentDto: UpdateParentDto,
  ) {
    return this.parentService.update(
      ref_id,
      updateParentDto,
    );
  }

  @Delete(':ref_id')
  remove(@Param('ref_id') ref_id: string) {
    return this.parentService.remove(ref_id);
  }
}
