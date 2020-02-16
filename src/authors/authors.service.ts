import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HttpException } from '@nestjs/common/exceptions/http.exception';
import { HttpStatus } from '@nestjs/common';
import { Logger } from '@nestjs/common';

import { ObjectID } from 'mongodb';

import { Author } from './interfaces/authors.interface';
import { AuthorEntity } from './author.entity';
import { CreateAuthorDto } from './dto/create-author.dto';
import { AuthorRepository } from './author.repository';

import { validate } from 'class-validator';

@Injectable()
export class AuthorsService {
  constructor(
    @InjectRepository(AuthorRepository)
    private readonly authorRepository: AuthorRepository,
  ) {}

  async findAll(): Promise<Author[]> {
    try {
      return await this.authorRepository.find();
    } catch (error) {
      Logger.error('findAll: Error on retrieve authors', error);
      throw new HttpException(
        { message: 'findAll: Error on retrieve authors', error },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findOne(id: string): Promise<Author> {
    try {
      const author = await this.authorRepository.findOne(id);
      if (!author) {
        throw new NotFoundException(`Author with ID "${id}" not found`);
      }
      return author;
    } catch (error) {
      Logger.error(`findOne: Incorrect ID format ${id}`, error);
      throw new HttpException(
        { message: `Incorrect ID format ${id}`, error },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async create(createAuthorDto: CreateAuthorDto): Promise<Author> {
    return this.authorRepository.createAuthor(createAuthorDto);
  }

  async update(id: string, createAuthorDto: CreateAuthorDto): Promise<Author> {
    let atr = new AuthorEntity();
    atr.lastName = createAuthorDto.lastName;
    atr.firstName = createAuthorDto.firstName;
    atr.birthday = new Date(createAuthorDto.birthday);
    const errors = await validate(atr);
    if (errors.length) {
      throw new HttpException(
        { message: 'Validation failed!', errors },
        HttpStatus.BAD_REQUEST,
      );
    } else {
      const author = await this.authorRepository.findOneAndUpdate(
        { _id: new ObjectID(id) },
        { $set: createAuthorDto },
        { returnOriginal: false },
      );
      if (!author.lastErrorObject.updatedExisting) {
        throw new NotFoundException(
          `Not updated author with ID "${id}" not found`,
        );
      }
      return { ...author.value, id: author.value._id, _id: undefined };
    }
  }

  async delete(id: string): Promise<void> {
    const { result } = await this.authorRepository.deleteOne({
      _id: new ObjectID(id),
    });
    if (!result.n) {
      throw new NotFoundException(`Author with ID "${id}" not found`);
    }
  }
}
