import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthorsController } from './authors.controller';
import { AuthorsService } from './authors.service';
import { AuthorRepository } from './author.repository';

@Module({
  imports: [TypeOrmModule.forFeature([AuthorRepository])],
  controllers: [AuthorsController],
  providers: [AuthorsService],
})
export class AuthorsModule {}
