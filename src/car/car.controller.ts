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
import { CarService } from './car.service';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { ApiHeader, ApiParam, ApiTags } from '@nestjs/swagger';
import { AuditFilterCarDto } from './audit/dto/filter-car.dto';
import { FilterCarDto } from './dto/filter-car.dto';

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
@ApiTags('car')
@Controller('car')
export class CarController {
  constructor(private readonly carService: CarService) {}

  @Get(':header_ref_id/audit')
  @ApiParam({
    name: 'header_ref_id',
    description: 'Car ref id',
    type: 'string',
  })
  auditAll(
    @Param('header_ref_id') headerRefId: string,
    @Query() query: AuditFilterCarDto,
  ) {
    query.header_ref_id = headerRefId;
    return this.carService.auditAll(query);
  }

  @Get(':header_ref_id/audit/count')
  @ApiParam({
    name: 'header_ref_id',
    description: 'Car ref id',
    type: 'string',
  })
  auditAllCount(
    @Param('header_ref_id') headerRefId: string,
    @Query() query: AuditFilterCarDto,
  ) {
    query.header_ref_id = headerRefId;
    return this.carService.countFilteredAudit(query);
  }

  @Post()
  create(@Body() createCarDto: CreateCarDto) {
    console.log('createDto', createCarDto);
    return this.carService.create(createCarDto);
  }

  @Get()
  findAll(@Query() query: FilterCarDto) {
    console.log(query);
    return this.carService.findAll(query);
  }

  @Get('/count')
  count(@Query() query: FilterCarDto) {
    return this.carService.countFiltered(query);
  }

  @Get(':ref_id')
  findOne(@Param('ref_id') ref_id: string) {
    return this.carService.findOne(ref_id);
  }

  @Patch(':ref_id')
  update(
    @Param('ref_id') ref_id: string,
    @Body() updateCarDto: UpdateCarDto,
  ) {
    return this.carService.update(ref_id, updateCarDto);
  }

  @Delete(':ref_id')
  remove(@Param('ref_id') ref_id: string) {
    return this.carService.remove(ref_id);
  }
}
