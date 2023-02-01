import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ServiceKeyChecker } from 'common/middleware/servicekey';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TemplateModule } from './template/template.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [`.env`],
    }),
    MongooseModule.forRoot(process.env.MONGO_CONNECTION_STRING),
    TemplateModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ServiceKeyChecker).forRoutes('*');
  }
}
