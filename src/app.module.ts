import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TemplateModule } from './template/template.module';

@Module({
  imports: [TemplateModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
