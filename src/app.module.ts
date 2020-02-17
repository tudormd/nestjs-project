import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthorsModule } from './authors/authors.module';
import { BooksModule } from './books/books.module';

import { DataBaseConfigModule } from './config/database/configuration.module';
import { DataBaseConfigService } from './config/database/configuration.service';

@Module({
  imports: [
    AuthorsModule,
    ConfigModule.forRoot({
      envFilePath: process.env.APP_ENV ? `.${process.env.APP_ENV}.env` : '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [DataBaseConfigModule],
      inject: [DataBaseConfigService],
      useFactory: (configService: DataBaseConfigService) => ({
        type: configService.type,
        host: configService.host,
        port: configService.port,
        username: configService.username,
        password: configService.password,
        database: configService.name,
        entities: [configService.entities],
        synchronize: configService.synchronize,
        useNewUrlParser: configService.useNewUrlParser,
        logging: configService.logging,
        useUnifiedTopology: configService.useUnifiedTopology,
      }),
    }),
    BooksModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
