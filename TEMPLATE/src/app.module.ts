import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { LoginUser } from 'common/middleware/login';
import { ServiceKeyChecker } from 'common/middleware/servicekey';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [`.env`],
    }),
    MongooseModule.forRoot(process.env.MONGO_CONNECTION_STRING),
    // TemplateModule
  ],
  // controllers: [AppController],
  // providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ServiceKeyChecker, LoginUser).forRoutes('*');
  }
}
