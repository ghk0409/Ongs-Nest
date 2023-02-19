import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  // 비즈니스 로직이 담긴 함수만 실행시켜주도록 변경!
  @Get('/hello')
  sayHello(): string {
    return this.appService.getHi();
  }
}
