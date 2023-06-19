import { Module } from '@nestjs/common';
import { ParentService } from './parent.service';
import { ParentController } from './parent.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Parent, ParentSchema } from './entities/parent.entity';
import { ParentAudit, ParentAuditSchema } from './audit/entities/parent.entity';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: Parent.name,
        useFactory: () => factoryFunction(),
      },
      {
        name: ParentAudit.name,
        useFactory: () => {
          return ParentAuditSchema;
        },
      },
    ]),
  ],
  controllers: [ParentController],
  providers: [ParentService],
  exports: [ParentService],
})
export class ParentModule {}

function generateAudit(originalValue: any, newValue: Parent) {
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
  const schema = ParentSchema;
  let originalValue = null;
  schema.post('init', function () {
    originalValue = this.toObject();
  });
  schema.pre<Parent>('save', async function () {
    if (originalValue != null) generateAudit(originalValue, this);
  });
  return schema;
}
