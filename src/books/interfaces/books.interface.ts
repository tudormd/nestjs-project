import { Author } from '../../authors/interfaces/authors.interface';

export interface Book {
  readonly id: string;
  readonly title: string;
  readonly author: Author;
  readonly iban: string;
  readonly publishedAt: Date;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}
