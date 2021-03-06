import { Test, TestingModule } from '@nestjs/testing';
import { BooksService } from './books.service';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DataBaseConfigModule } from '../config/database/configuration.module';
import { DataBaseConfigService } from '../config/database/configuration.service';
import { BookRepository } from './book.repository';
import { AuthorRepository } from '../authors/author.repository';
import { Book } from './interfaces/books.interface';
import { AuthorsService } from '../authors/authors.service';

describe('BooksService', () => {
  let booksService: BooksService;
  let authorsService: AuthorsService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BooksService, AuthorsService],
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

    booksService = module.get<BooksService>(BooksService);
    authorsService = module.get<AuthorsService>(AuthorsService);
  });

  it('should be defined', () => {
    expect(booksService).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of author', async () => {
      const result = Promise.resolve<Book[]>([]);
      jest.spyOn(booksService, 'findAll').mockImplementation(() => result);
      await expect(result).resolves.toBe(await booksService.findAll());
    });
  });

  describe('findOne', () => {
    it('should return an object of author', async () => {
      const author = await authorsService.create({
        firstName: 'User_Third',
        lastName: 'User_Third',
        birthday: new Date('1850-02-15T21:11:16.000Z'),
      });
      const book = await booksService.create({
        title: 'Book_One',
        iban: '12345678987654321',
        publishedAt: new Date('1950-02-15T21:11:16.000Z'),
        author,
      });
      const result = await booksService.findOne(book.id);
      expect(book.title).toEqual(result.title);
    });
  });

  describe('create', () => {
    it('should return an object of book', async () => {
      const author = await authorsService.create({
        firstName: 'User_',
        lastName: 'User_',
        birthday: new Date('1950-02-15T21:11:16.000Z'),
      });
      const book = await booksService.create({
        title: 'Book',
        iban: '12345678987654321',
        publishedAt: new Date('1950-02-15T21:11:16.000Z'),
        author,
      });
      expect(book.title).toEqual('Book');
    });
  });

  describe('update', () => {
    it('should return an object of book', async () => {
      const author = await authorsService.create({
        firstName: 'User_',
        lastName: 'User_',
        birthday: new Date('1950-02-15T21:11:16.000Z'),
      });
      const book = await booksService.create({
        title: 'Book',
        iban: '12345678987654321',
        publishedAt: new Date('1950-02-15T21:11:16.000Z'),
        author,
      });
      const result = await booksService.update(book.id, {
        iban: '12345678987654321',
        publishedAt: new Date('1950-02-15T21:11:16.000Z'),
        author,
        title: 'C++',
      });
      expect(result.title).toEqual('C++');
    });
  });

  describe('delete', () => {
    it('should return void', async () => {
      const author = await authorsService.create({
        firstName: 'User_',
        lastName: 'User_',
        birthday: new Date('1950-02-15T21:11:16.000Z'),
      });
      const book = await booksService.create({
        title: 'Book',
        iban: '12345678987654321',
        publishedAt: new Date('1950-02-15T21:11:16.000Z'),
        author,
      });
      const result = await booksService.delete(book.id);
      expect(result).toBeUndefined();
    });
  });
});
