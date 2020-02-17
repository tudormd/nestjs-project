import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class DataBaseConfigService {
  constructor(private readonly configService: ConfigService) {}

  get type() {
    return this.configService.get('db.type');
  }
  get host(): string {
    return this.configService.get<string>('db.host');
  }

  get username(): string {
    return this.configService.get<string>('db.username');
  }

  get entities(): string {
    return this.configService.get<string>('db.entities');
  }

  get synchronize(): boolean {
    return this.configService.get<boolean>('db.synchronize');
  }

  get useNewUrlParser(): boolean {
    return this.configService.get<boolean>('db.useNewUrlParser');
  }
  get logging(): boolean {
    return this.configService.get<boolean>('db.logging');
  }

  get name(): string {
    return this.configService.get<string>('db.name');
  }
  get useUnifiedTopology(): boolean {
    return this.configService.get<boolean>('db.useUnifiedTopology');
  }

  get env(): string {
    return this.configService.get<string>('db.env');
  }
  get url(): string {
    return this.configService.get<string>('db.url');
  }
  get port(): number {
    return Number(this.configService.get<number>('db.port'));
  }
  get password(): string {
    const password = this.configService.get('db.password');
    return password;
  }
}
