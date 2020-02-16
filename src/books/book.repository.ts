import { EntityRepository, MongoRepository } from 'typeorm';

import { BookEntity } from './book.entity';
import { CreateBookDto } from './dto/create-book.dto';
import { Book } from './interfaces/books.interface';

@EntityRepository(BookEntity)
export class BookRepository extends MongoRepository<BookEntity> {
  async createBook(createBookDto: CreateBookDto): Promise<Book> {
    const { title, author, iban, publishedAt } = createBookDto;
    const newBook = new BookEntity();
    (newBook.title = title),
      (newBook.author = author),
      (newBook.iban = iban);
    (newBook.publishedAt = publishedAt);
    await newBook.save();
    return newBook;
  }
}
