import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BookRepository } from './book.repository';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { AuthorsService } from '@/authors/authors.service';
import { AuthorRepository } from '@/authors/author.repository';

@Module({
  imports: [TypeOrmModule.forFeature([BookRepository, AuthorRepository])],
  controllers: [BooksController],
  providers: [BooksService],
})
export class BooksModule { }
