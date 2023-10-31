import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiHeader } from '@nestjs/swagger';

@ApiHeader({
  name: 'servicekey',
  description: 'Service Key for API',
  schema: { default: `${process.env.SERVICE_KEY}` },
})
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
