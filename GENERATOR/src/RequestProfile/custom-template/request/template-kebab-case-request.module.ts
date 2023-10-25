import { Module } from '@nestjs/common';
import { TemplatePascalRequestService } from './template-kebab-case-request.service';
import { TemplatePascalRequestController } from './template-kebab-case-request.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  TemplatePascalRequest,
  TemplatePascalRequestSchema,
} from './entities/template-kebab-case-request.entity';
import {
  TemplatePascalRequestAudit,
  TemplatePascalRequestAuditSchema,
} from './audit/entities/template-kebab-case-request.entity';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: TemplatePascalRequest.name,
        useFactory: () => factoryFunction(),
      },
      {
        name: TemplatePascalRequestAudit.name,
        useFactory: () => {
          return TemplatePascalRequestAuditSchema;
        },
      },
    ]),
  ],
  controllers: [TemplatePascalRequestController],
  providers: [TemplatePascalRequestService],
})
export class TemplatePascalRequestModule {}

function generateAudit(originalValue: any, newValue: TemplatePascalRequest) {
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
  const schema = TemplatePascalRequestSchema;
  let originalValue = null;
  schema.post('init', function () {
    originalValue = this.toObject();
  });
  schema.pre<TemplatePascalRequest>('save', async function () {
    if (originalValue != null) generateAudit(originalValue, this);
  });
  return schema;
}
