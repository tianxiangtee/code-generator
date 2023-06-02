import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { MasterService } from 'common/master.service';
import { Model } from 'mongoose';
import { AuditFilterCarDto } from './audit/dto/filter-car.dto';
import { CarAudit, CarAuditDocument } from './audit/entities/car.entity';
import { CreateCarDto } from './dto/create-car.dto';
import { FilterCarDto } from './dto/filter-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { Car, CarDocument } from './entities/car.entity';

@Injectable()
export class CarService extends MasterService<
  Car,
  CarAudit,
  CreateCarDto,
  UpdateCarDto,
  FilterCarDto,
  AuditFilterCarDto
> {
  constructor(
    @InjectModel(Car.name)
    protected currentModel: Model<CarDocument>,
    @InjectModel(CarAudit.name)
    protected auditModel: Model<CarAuditDocument>,
  ) {
    super(currentModel, auditModel);
  }
}
