import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { LoginUser } from 'common/middleware/login';
import { ServiceKeyChecker } from 'common/middleware/servicekey';
import { ParentModule } from './Parent/parent.module';
import { ChildModule } from './Child/child.module';
import { APP_FILTER } from '@nestjs/core';
import { GlobalExceptionFilter } from 'common/global/globalExceptionFilter';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [`.env`],
    }),
    MongooseModule.forRoot(process.env.MONGO_CONNECTION_STRING),
    ParentModule,
    ChildModule,
  ],
  // controllers: [AppController],
  providers: [{
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter,
    }],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ServiceKeyChecker, LoginUser).forRoutes('*');
  }
}
