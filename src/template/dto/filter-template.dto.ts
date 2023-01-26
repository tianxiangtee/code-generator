import { ApiProperty } from '@nestjs/swagger';

export class FilterTemplateDto {
  @ApiProperty({ required: true })
  template_name: string;
}
