import { Prop } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';

export class CommonSchema {
  @ApiProperty()
  @Prop({ unique: true })
  ref_id: string;
}
