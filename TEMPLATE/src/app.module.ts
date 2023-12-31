import { MiddlewareConsumer, Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { APP_FILTER } from "@nestjs/core";
import { GlobalExceptionFilter } from "common/global/globalExceptionFilter";
import { LoginUser } from "common/middleware/login";
import { ServiceKeyChecker } from "common/middleware/servicekey";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [`.env`],
    }),
    MongooseModule.forRoot(process.env.MONGO_CONNECTION_STRING),
    // TemplateModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter,
    },
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ServiceKeyChecker, LoginUser).forRoutes("*");
  }
}
