import { EntityRepository, MongoRepository } from 'typeorm';

import { CreateAuthorDto } from './dto/create-author.dto';
import { Author } from './interfaces/authors.interface';
import { AuthorEntity } from './author.entity';

@EntityRepository(AuthorEntity)
export class AuthorRepository extends MongoRepository<AuthorEntity> {
  async createAuthor(createAuthorDto: CreateAuthorDto): Promise<Author> {
    const { firstName, lastName, birthday } = createAuthorDto;
    const newAuthor = new AuthorEntity();
    (newAuthor.firstName = firstName),
      (newAuthor.lastName = lastName),
      (newAuthor.birthday = birthday);
    await newAuthor.save();
    return newAuthor;
  }
}
