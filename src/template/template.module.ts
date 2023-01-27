import { Module } from '@nestjs/common';
import { TemplateService } from './template.service';
import { TemplateController } from './template.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Template, TemplateSchema } from './entities/template.entity';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: Template.name,
        useFactory: () => {
          const schema = TemplateSchema;
          // schema.path('_id').set(function (newVal) {
          //   console.log('newVal', newVal);
          //   console.log('ori', this);
          // });
          schema.post('init', function () {
            const temp = this.toObject();
            console.log('ori', temp);
          });
          schema.pre<Template>('save', async function () {
            console.log('pre save mongo');
          });
          return schema;
        },
      },
    ]),
  ],
  controllers: [TemplateController],
  providers: [TemplateService],
})
export class TemplateModule { }
