import {
  Injectable,
  Logger,
  HttpException,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { validate } from 'class-validator';
import { ObjectID } from 'mongodb';

import { BookRepository } from './book.repository';
import { Book } from './interfaces/books.interface';
import { CreateBookDto } from './dto/create-book.dto';
import { AuthorRepository } from '../authors/author.repository';
import { BookEntity } from './book.entity';
import { AuthorEntity } from '@/authors/author.entity';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(BookRepository)
    private readonly bookRepository: BookRepository,
    @InjectRepository(AuthorRepository)
    private readonly authorRepository: AuthorRepository,
  ) {}

  async findAll(): Promise<Book[]> {
    try {
      return await this.bookRepository.find();
    } catch (error) {
      Logger.error('findAll: Error on retrieve books', error);
      throw new HttpException(
        { message: 'findAll: Error on retrieve books', error },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findOne(id: string): Promise<Book> {
    try {
      const book = await this.bookRepository.findOne(id);
      if (!book) {
        throw new NotFoundException(`Book with ID "${id}" not found`);
      }
      return book;
    } catch (error) {
      Logger.error(`findOne: Incorrect ID format ${id}`, error);
      throw new HttpException(
        { message: `Incorrect ID format ${id}`, error },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async getBooksByAuthorId(id: string): Promise<Book[]> {
    try {
      const books = await this.bookRepository.find({
        where: { 'author._id': new ObjectID(id) },
      });
      return books;
    } catch (error) {
      Logger.error(
        'findBooksByAuthorId: Error on retrieve books by author Id',
        error,
      );
      throw new HttpException(
        {
          message: 'findBooksByAuthorId: Error on retrieve books by author Id',
          error,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async create(createBookDto: CreateBookDto): Promise<Book> {
    const author = await this.authorRepository.findOne(createBookDto.author.id);
    const { title, iban, publishedAt } = createBookDto;
    const book = this.bookRepository.create({
      title,
      iban,
      publishedAt,
      author: { ...author, _id: new ObjectID(author.id), id: undefined },
    });
    await this.bookRepository.save(book);
    return book;
  }

  async update(id: string, createBookDto: CreateBookDto): Promise<Book> {
    const result = await this.bookRepository.findOne(id);
    let book = new BookEntity();
    book.title = createBookDto.title;
    book.publishedAt = new Date(createBookDto.publishedAt);
    book.iban = createBookDto.iban;
    book.author = {
      ...result.author,
      _id: new ObjectID(result.id),
      id: undefined,
    } as AuthorEntity;
    const errors = await validate(book);
    if (errors.length) {
      throw new HttpException(
        { message: 'Validation failed!', errors },
        HttpStatus.BAD_REQUEST,
      );
    } else {
      const result = await this.bookRepository.findOneAndUpdate(
        { _id: new ObjectID(id) },
        { $set: book },
        { returnOriginal: false },
      );
      if (!result.lastErrorObject.updatedExisting) {
        throw new NotFoundException(
          `Not updated author with ID "${id}" not found`,
        );
      }
      return { ...result.value, id: result.value._id, _id: undefined };
    }
  }

  async delete(id: string): Promise<void> {
    const { result } = await this.bookRepository.deleteOne({
      _id: new ObjectID(id),
    });
    if (!result.n) {
      throw new NotFoundException(`Book with ID "${id}" not found`);
    }
  }
}
