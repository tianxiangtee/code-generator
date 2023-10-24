import { Temp123RequestModule } from "./module/Temp123/request/temp-123-request.module";
import { MiddlewareConsumer, Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { LoginUser } from "common/middleware/login";
import { ServiceKeyChecker } from "common/middleware/servicekey";
import { Temp123ProfileModule } from "./module/Temp123/record/temp-123-profile.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [`.env`],
    }),
    Temp123RequestModule,
    Temp123ProfileModule,
    MongooseModule.forRoot(process.env.MONGO_CONNECTION_STRING),
    // TemplateModule
  ],
  // controllers: [AppController],
  // providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ServiceKeyChecker, LoginUser).forRoutes("*");
  }
}
