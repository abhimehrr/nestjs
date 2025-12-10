import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { BaseController } from './base.controller';

// Controller
@Controller()
export class AppController extends BaseController {
  constructor(private readonly appService: AppService) {
    super();
  }

  @Get()
  getHome() {
    const home = this.appService.getHome();
    return this.ok({ data: home });
  }
}
