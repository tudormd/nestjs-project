import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthorsModule } from './authors/authors.module';
import { BooksModule } from './books/books.module';
import configuration from './config/configuration';

@Module({
  imports: [
    AuthorsModule,
    ConfigModule.forRoot({ load: [configuration] }),
    TypeOrmModule.forRoot(),
    BooksModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
