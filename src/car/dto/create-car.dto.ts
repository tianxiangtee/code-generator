import { ApiProperty } from '@nestjs/swagger';
import { CommonDto } from 'common/constant/common-dto';

export class CreateCarDto extends CommonDto {
  @ApiProperty()
  car_name: string;
}
