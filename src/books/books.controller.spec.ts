import { Test, TestingModule } from '@nestjs/testing';
import { BooksController } from './books.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BookRepository } from './book.repository';
import { AuthorRepository } from '../authors/author.repository';
import { BooksService } from './books.service';
import { DataBaseConfigModule } from '../config/database/configuration.module';
import { DataBaseConfigService } from '../config/database/configuration.service';

describe('Books Controller', () => {
  let controller: BooksController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BooksController],
      providers: [BooksService],
      imports: [
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
        TypeOrmModule.forFeature([BookRepository, AuthorRepository]),
      ],
    }).compile();

    controller = module.get<BooksController>(BooksController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
