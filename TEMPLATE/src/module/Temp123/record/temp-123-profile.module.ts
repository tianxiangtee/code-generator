import { Module } from '@nestjs/common';
import { Temp123ProfileService } from './temp-123-profile.service';
import { Temp123ProfileController } from './temp-123-profile.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Temp123Profile,
  Temp123ProfileSchema,
} from './entities/temp-123-profile.entity';
import {
  Temp123ProfileAudit,
  Temp123ProfileAuditSchema,
} from './audit/entities/temp-123-profile.entity';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: Temp123Profile.name,
        useFactory: () => factoryFunction(),
      },
      {
        name: Temp123ProfileAudit.name,
        useFactory: () => {
          return Temp123ProfileAuditSchema;
        },
      },
    ]),
  ],
  controllers: [Temp123ProfileController],
  providers: [Temp123ProfileService],
})
export class Temp123ProfileModule {}

function generateAudit(originalValue: any, newValue: Temp123Profile) {
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
  const schema = Temp123ProfileSchema;
  let originalValue = null;
  schema.post('init', function () {
    originalValue = this.toObject();
  });
  schema.pre<Temp123Profile>('save', async function () {
    if (originalValue != null) generateAudit(originalValue, this);
  });
  return schema;
}
