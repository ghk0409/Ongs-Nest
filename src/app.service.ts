import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello NestJS!!!';
  }
  // 서비스에 신규 비즈니스 로직(함수) 생성
  getHi(): string {
    return 'Hello This is Ongs Nest!!';
  }
}
