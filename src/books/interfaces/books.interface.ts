import { AuthorEntity } from '@/authors/author.entity';

export interface Book {
  readonly id: string;
  readonly title: string;
  readonly author: AuthorEntity;
  readonly iban: string;
  readonly publishedAt: Date;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}
