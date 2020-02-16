import { IsNotEmpty, IsString, MinLength, MaxLength } from 'class-validator';
import { Transform, Type } from 'class-transformer';

import { ApiProperty } from '@nestjs/swagger';
import { AuthorEntity } from '@/authors/author.entity';

export class CreateBookDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(3, {
    message: 'Title too short',
  })
  @MaxLength(50, {
    message: 'Title is too long',
  })
  title: string;

  @ApiProperty()
  @IsNotEmpty()
  author: AuthorEntity;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(10, {
    message: 'Iban too short',
  })
  @MaxLength(34, {
    message: 'Iban is too long',
  })
  iban: string;

  @ApiProperty()
  @IsNotEmpty()
  @Type(() => Date)
  @Transform(value => new Date(value), { toClassOnly: true })
  publishedAt: Date;
}
