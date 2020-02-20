import { EntityRepository, MongoRepository } from 'typeorm';

import { BookEntity } from './book.entity';

@EntityRepository(BookEntity)
export class BookRepository extends MongoRepository<BookEntity> {}
