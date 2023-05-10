import { Module } from '@nestjs/common';
import { CarService } from './car.service';
import { CarController } from './car.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Car, CarSchema } from './entities/car.entity';
import { CarAudit, CarAuditSchema } from './audit/entities/car.entity';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: Car.name,
        useFactory: () => factoryFunction(),
      },
      {
        name: CarAudit.name,
        useFactory: () => {
          return CarAuditSchema;
        },
      },
    ]),
  ],
  controllers: [CarController],
  providers: [CarService],
})
export class CarModule {}

function generateAudit(originalValue: any, newValue: Car) {
  delete originalValue._id;
  const jsonObject1 = originalValue;
  const jsonObject2 = newValue;

  const keys = Object.keys(jsonObject1);
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    if (jsonObject1[key] != jsonObject2[key]) {
      console.log(
        key +
          " value changed from '" +
          jsonObject1[key] +
          "' to '" +
          jsonObject2[key] +
          "'",
      );
    }
  }
}
function factoryFunction() {
  const schema = CarSchema;
  let originalValue = null;
  schema.post('init', function () {
    originalValue = this.toObject();
  });
  schema.pre<Car>('save', async function () {
    if (originalValue != null) generateAudit(originalValue, this);
  });
  return schema;
}
