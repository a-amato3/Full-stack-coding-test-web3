import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ERC20 } from './models/token-interface';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  public getAddress(): Promise<ERC20> {
    return this.appService.getAddress();
  }
}
