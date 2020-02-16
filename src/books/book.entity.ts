import { Transform, Type } from 'class-transformer';

import { ObjectID } from 'mongodb';

import {
  BaseEntity,
  ObjectIdColumn,
  UpdateDateColumn,
  CreateDateColumn,
  Column,
  Entity,
} from 'typeorm';

import { AuthorEntity } from '../authors/author.entity';

@Entity('book')
export class BookEntity extends BaseEntity {
  @ObjectIdColumn()
  id!: number;

  @ObjectIdColumn({ name: 'id' })
  _id!: ObjectID;

  @Column({ type: 'varchar', length: 50, nullable: false })
  title: string;

  @Column(() => AuthorEntity)
  author: AuthorEntity;

  @Column({ type: 'varchar', length: 34, nullable: false })
  iban: string;

  @Type(() => Date)
  @Transform(value => new Date(value), { toClassOnly: true })
  @Column({ type: Date })
  publishedAt: Date;


  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}
