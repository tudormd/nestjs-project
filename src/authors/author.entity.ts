import {
  Entity,
  Column,
  ObjectIdColumn,
  UpdateDateColumn,
  CreateDateColumn,
  BaseEntity,
} from 'typeorm';

import { ObjectID } from 'mongodb';
import { ApiProperty } from '@nestjs/swagger';

import { Transform, Type } from 'class-transformer';

@Entity('author')
export class AuthorEntity extends BaseEntity {
  @ApiProperty()
  @ObjectIdColumn()
  id!: string;

  @ObjectIdColumn({ name: 'id' })
  _id!: ObjectID;

  @ApiProperty()
  @Column({ type: 'varchar', length: 50, nullable: false })
  firstName: string;

  @ApiProperty()
  @Column({ type: 'varchar', length: 50, nullable: false })
  lastName: string;

  @ApiProperty()
  @Type(() => Date)
  @Transform(value => new Date(value), { toClassOnly: true })
  @Column({ type: Date })
  birthday: Date;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}
