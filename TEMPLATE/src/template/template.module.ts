import { Module } from '@nestjs/common';
import { TemplateService } from './template.service';
import { TemplateController } from './template.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Template, TemplateSchema } from './entities/template.entity';
import { TemplateAudit, TemplateAuditSchema } from './audit/entities/template.entity';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: Template.name,
        useFactory: () => factoryFunction(),
      },
      {
        name: TemplateAudit.name,
        useFactory: () => {
          return TemplateAuditSchema;
        },
      },
    ]),
  ],
  controllers: [TemplateController],
  providers: [TemplateService],
})
export class TemplateModule {}

function generateAudit(originalValue: any, newValue: Template) {
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
  const schema = TemplateSchema;
  let originalValue = null;
  schema.post('init', function () {
    originalValue = this.toObject();
  });
  schema.pre<Template>('save', async function () {
    if (originalValue != null) generateAudit(originalValue, this);
  });
  return schema;
}
