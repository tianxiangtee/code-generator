import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TemplateService } from './template.service';
import { CreateTemplateDto } from './dto/create-template.dto';
import { UpdateTemplateDto } from './dto/update-template.dto';
import { ApiHeader } from '@nestjs/swagger';

@ApiHeader({
  name: 'servicekey',
  description: 'Service Key for API',
  schema: { default: `${process.env.SERVICE_KEY}` },
})
@Controller('template')
export class TemplateController {
  constructor(private readonly templateService: TemplateService) {}

  @Post()
  create(@Body() createTemplateDto: CreateTemplateDto) {
    return this.templateService.create(createTemplateDto);
  }

  @Get()
  findAll() {
    return this.templateService.findAll();
  }

  @Get('/count')
  count() {
    return this.templateService.count();
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
