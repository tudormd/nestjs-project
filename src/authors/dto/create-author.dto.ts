import { IsNotEmpty, IsString, MinLength, MaxLength } from 'class-validator';
import { Transform, Type } from 'class-transformer';

import { ApiProperty } from '@nestjs/swagger';

export class CreateAuthorDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(3, {
    message: 'First name too short',
  })
  @MaxLength(50, {
    message: 'First name is too long',
  })
  firstName: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(3, {
    message: 'Last name too short',
  })
  @MaxLength(50, {
    message: 'Last name is too long',
  })
  lastName: string;

  @ApiProperty()
  @IsNotEmpty()
  @Type(() => Date)
  @Transform(value => new Date(value), { toClassOnly: true })
  birthday: Date;
}
