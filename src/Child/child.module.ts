import { Module } from '@nestjs/common';
import { ChildService } from './child.service';
import { ChildController } from './child.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Child, ChildSchema } from './entities/child.entity';
import { ChildAudit, ChildAuditSchema } from './audit/entities/child.entity';
import { ParentModule } from 'src/Parent/parent.module';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: Child.name,
        useFactory: () => factoryFunction(),
      },
      {
        name: ChildAudit.name,
        useFactory: () => {
          return ChildAuditSchema;
        },
      },
    ]),
    ParentModule,
  ],
  controllers: [ChildController],
  providers: [ChildService],
})
export class ChildModule {}

function generateAudit(originalValue: any, newValue: Child) {
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
  const schema = ChildSchema;
  let originalValue = null;
  schema.post('init', function () {
    originalValue = this.toObject();
  });
  schema.pre<Child>('save', async function () {
    if (originalValue != null) generateAudit(originalValue, this);
  });
  return schema;
}
