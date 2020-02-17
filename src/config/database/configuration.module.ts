import * as Joi from '@hapi/joi';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { DataBaseConfigService } from './configuration.service';

import configuration from './configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      validationSchema: Joi.object({
        APP_ENV: Joi.string()
          .valid('development', 'production', 'test', 'provision')
          .default('development'),
        APP_PORT: Joi.number().default(3000),
      }),
    }),
  ],
  providers: [DataBaseConfigService],
  exports: [DataBaseConfigService],
})
export class DataBaseConfigModule {}
