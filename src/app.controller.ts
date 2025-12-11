import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { BaseController } from './base.controller';

// Controller
@Controller()
export class AppController extends BaseController {
  constructor(private readonly appService: AppService) {
    super();
  }

  // Welcome Home
  @Get()
  welcomeHome() {
    return this.ok({
      message: 'Welcome to the API House!',
      data: this.appService.welcomeHome(),
    });
  }

  // Health Check
  @Get('health')
  checkHealth() {
    return this.ok({
      message: 'YES, yes... API is healthy! Stop pinging every minute.',
      data: this.appService.checkHealth(),
    });
  }

  // API Documentation
  @Get('docs')
  documentation() {
    return this.ok({
      message:
        'Lost? "/docs" —  read them like your job depends on it (because it does).',
      data: this.appService.documentation(),
    });
  }
}
