import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHome() {
    return '🏡 Finally, you found HOME.';
  }
}
