import {
  Get,
  Post,
  Body,
  Put,
  Delete,
  Param,
  Controller,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { AuthorsService } from './authors.service';
import { Author } from './interfaces/authors.interface';
import { CreateAuthorDto } from './dto/create-author.dto';

@ApiTags('authors')
@Controller('authors')
export class AuthorsController {
  constructor(private readonly authorsService: AuthorsService) {}

  @ApiOperation({ summary: 'Get all authors' })
  @ApiResponse({
    status: 200,
    description: 'Return all author.',
    type: CreateAuthorDto,
  })
  @Get()
  async findAll(): Promise<Author[]> {
    return await this.authorsService.findAll();
  }

  @ApiOperation({ summary: 'Get author' })
  @ApiResponse({
    status: 200,
    description: 'Return one author.',
    type: CreateAuthorDto,
  })
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Author> {
    return this.authorsService.findOne(id);
  }

  @ApiOperation({ summary: 'Create author' })
  @ApiResponse({ status: 200, description: 'Return author.' })
  @Post()
  addAuthor(@Body() createAuthorDto: CreateAuthorDto): Promise<Author> {
    return this.authorsService.create(createAuthorDto);
  }

  @ApiOperation({ summary: 'Update author by id' })
  @ApiResponse({ status: 200, description: 'Return author.' })
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() createAutorDto: CreateAuthorDto,
  ): Promise<Author> {
    return this.authorsService.update(id, createAutorDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete author by id' })
  delete(@Param('id') id: string): Promise<void> {
    return this.authorsService.delete(id);
  }
}
