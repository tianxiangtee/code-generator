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
  import { TemplatePascalRequestService } from './template-kebab-case-request.service';
  import { CreateTemplatePascalRequestDto } from './dto/create-template-kebab-case-request.dto';
  import { UpdateTemplatePascalRequestDto } from './dto/update-template-kebab-case-request.dto';
  import { ApiHeader, ApiParam, ApiTags } from '@nestjs/swagger';
  import { FilterTemplatePascalRequestDto } from './dto/filter-template-kebab-case-request.dto';
  
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
  @ApiTags('templateCamelCaseRequest')
  @Controller('templateCamelCaseRequest')
  export class TemplatePascalRequestController {
    constructor(
      private readonly templateCamelCaseRequestService: TemplatePascalRequestService,
    ) {}
  
    @Post()
    create(@Body() createTemplatePascalRequestDto: CreateTemplatePascalRequestDto) {
      console.log('createDto', createTemplatePascalRequestDto);
      return this.templateCamelCaseRequestService.create(createTemplatePascalRequestDto);
    }
  
    @Get()
    findAll(@Query() query: FilterTemplatePascalRequestDto) {
      console.log(query);
      return this.templateCamelCaseRequestService.findAll(query);
    }
  
    @Get('/count')
    count(@Query() query: FilterTemplatePascalRequestDto) {
      return this.templateCamelCaseRequestService.countFiltered(query);
    }
  
    @Get(':ref_id')
    findOne(@Param('ref_id') ref_id: string) {
      return this.templateCamelCaseRequestService.findOne(ref_id);
    }
  
    @Patch(':ref_id')
    update(
      @Param('ref_id') ref_id: string,
      @Body() updateTemplatePascalRequestDto: UpdateTemplatePascalRequestDto,
    ) {
      return this.templateCamelCaseRequestService.update(
        ref_id,
        updateTemplatePascalRequestDto,
      );
    }
  
    @Delete(':ref_id')
    remove(@Param('ref_id') ref_id: string) {
      return this.templateCamelCaseRequestService.remove(ref_id);
    }
  }
  