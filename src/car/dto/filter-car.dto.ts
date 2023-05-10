import { ApiProperty } from '@nestjs/swagger';
import { CommonFilterDto } from 'common/constant/common-dto';

export class FilterCarDto extends CommonFilterDto {
  @ApiProperty({ required: false })
  car_name: string;
}
