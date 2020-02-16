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
import { AuthorRepository } from '@/authors/author.repository';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(BookRepository)
    private readonly bookRepository: BookRepository,
    @InjectRepository(AuthorRepository)
    private readonly authorRepository: AuthorRepository,
  ) { }

  async findAll(): Promise<Book[]> {
    try {
      return await this.bookRepository.find({
        relations: ["author"],
      });
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

  async create(createBookDto: CreateBookDto): Promise<Book> {
    const author = await this.authorRepository.findOne(createBookDto.author);

    return this.bookRepository.createBook({ ...createBookDto, author });
  }

  async update(id: string, createBookDto: CreateBookDto): Promise<Book> {
    let book = new CreateBookDto();
    book.title = createBookDto.title;
    book.publishedAt = new Date(createBookDto.publishedAt);
    book.iban = createBookDto.iban;
    const errors = await validate(book);
    if (errors.length) {
      throw new HttpException(
        { message: 'Validation failed!', errors },
        HttpStatus.BAD_REQUEST,
      );
    } else {
      const book = await this.bookRepository.findOneAndUpdate(
        { _id: new ObjectID(id) },
        { $set: createBookDto },
        { returnOriginal: false },
      );
      if (!book.lastErrorObject.updatedExisting) {
        throw new NotFoundException(
          `Not updated author with ID "${id}" not found`,
        );
      }
      return { ...book.value, id: book.value._id, _id: undefined };
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
