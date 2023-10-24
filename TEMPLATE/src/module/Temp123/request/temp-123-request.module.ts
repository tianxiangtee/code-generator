import { Module } from '@nestjs/common';
import { Temp123RequestService } from './temp-123-request.service';
import { Temp123RequestController } from './temp-123-request.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Temp123Request,
  Temp123RequestSchema,
} from './entities/temp-123-request.entity';
import {
  Temp123RequestAudit,
  Temp123RequestAuditSchema,
} from './audit/entities/temp-123-request.entity';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: Temp123Request.name,
        useFactory: () => factoryFunction(),
      },
      {
        name: Temp123RequestAudit.name,
        useFactory: () => {
          return Temp123RequestAuditSchema;
        },
      },
    ]),
  ],
  controllers: [Temp123RequestController],
  providers: [Temp123RequestService],
})
export class Temp123RequestModule {}

function generateAudit(originalValue: any, newValue: Temp123Request) {
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
  const schema = Temp123RequestSchema;
  let originalValue = null;
  schema.post('init', function () {
    originalValue = this.toObject();
  });
  schema.pre<Temp123Request>('save', async function () {
    if (originalValue != null) generateAudit(originalValue, this);
  });
  return schema;
}
