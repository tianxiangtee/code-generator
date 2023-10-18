import { Module } from '@nestjs/common';
import { TemplatePascalService } from './template-kebab-case.service';
import { TemplatePascalController } from './template-kebab-case.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  TemplatePascal,
  TemplatePascalSchema,
} from './entities/template-kebab-case.entity.ts';
import {
  TemplatePascalAudit,
  TemplatePascalAuditSchema,
} from './audit/entities/template-kebab-case.entity';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: TemplatePascal.name,
        useFactory: () => factoryFunction(),
      },
      {
        name: TemplatePascalAudit.name,
        useFactory: () => {
          return TemplatePascalAuditSchema;
        },
      },
    ]),
  ],
  controllers: [TemplatePascalController],
  providers: [TemplatePascalService],
})
export class TemplatePascalModule {}

function generateAudit(originalValue: any, newValue: TemplatePascal) {
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
  const schema = TemplatePascalSchema;
  let originalValue = null;
  schema.post('init', function () {
    originalValue = this.toObject();
  });
  schema.pre<TemplatePascal>('save', async function () {
    if (originalValue != null) generateAudit(originalValue, this);
  });
  return schema;
}
