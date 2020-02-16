import {
  Controller,
  Get,
  Delete,
  Param,
  Body,
  Put,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { Book } from './interfaces/books.interface';

@ApiTags('books')
@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) { }

  @ApiOperation({ summary: 'Get all books' })
  @ApiResponse({
    status: 200,
    description: 'Return all books.',
    type: CreateBookDto,
  })
  @Get()
  async findAll(): Promise<Book[]> {
    return await this.booksService.findAll();
  }

  @ApiOperation({ summary: 'Get book' })
  @ApiResponse({
    status: 200,
    description: 'Return one book.',
    type: CreateBookDto,
  })
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Book> {
    return this.booksService.findOne(id);
  }

  @ApiOperation({ summary: 'Get books by author' })
  @ApiResponse({
    status: 200,
    description: 'Return books.',
    type: CreateBookDto,
  })
  @Get('author/:id')
  findBooksByAuthor(@Param('id') id: string): Promise<Book[]> {
    return this.booksService.getBooksByAuthorId(id);
  }

  @ApiOperation({ summary: 'Create book' })
  @ApiResponse({ status: 200, description: 'Return book.' })
  @Post()
  addAuthor(@Body() createBookDto: CreateBookDto): Promise<Book> {
    return this.booksService.create(createBookDto);
  }

  @ApiOperation({ summary: 'Update book by id' })
  @ApiResponse({ status: 200, description: 'Return book.' })
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() createBookDto: CreateBookDto,
  ): Promise<Book> {
    return this.booksService.update(id, createBookDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<void> {
    return this.booksService.delete(id);
  }
}
