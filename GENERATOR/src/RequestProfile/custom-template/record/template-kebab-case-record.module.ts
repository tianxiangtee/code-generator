import { Module } from '@nestjs/common';
import { TemplatePascalRecordService } from './template-kebab-case-record.service';
import { TemplatePascalRecordController } from './template-kebab-case-record.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  TemplatePascalRecord,
  TemplatePascalRecordSchema,
} from './entities/template-kebab-case-record.entity';
import {
  TemplatePascalRecordAudit,
  TemplatePascalRecordAuditSchema,
} from './audit/entities/template-kebab-case-record.entity';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: TemplatePascalRecord.name,
        useFactory: () => factoryFunction(),
      },
      {
        name: TemplatePascalRecordAudit.name,
        useFactory: () => {
          return TemplatePascalRecordAuditSchema;
        },
      },
    ]),
  ],
  controllers: [TemplatePascalRecordController],
  providers: [TemplatePascalRecordService],
})
export class TemplatePascalRecordModule {}

function generateAudit(originalValue: any, newValue: TemplatePascalRecord) {
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
  const schema = TemplatePascalRecordSchema;
  let originalValue = null;
  schema.post('init', function () {
    originalValue = this.toObject();
  });
  schema.pre<TemplatePascalRecord>('save', async function () {
    if (originalValue != null) generateAudit(originalValue, this);
  });
  return schema;
}
