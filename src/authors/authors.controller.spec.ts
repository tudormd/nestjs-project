import { Test, TestingModule } from '@nestjs/testing';
import { AuthorsController } from './authors.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DataBaseConfigModule } from '../config/database/configuration.module';
import { DataBaseConfigService } from '../config/database/configuration.service';
import { AuthorRepository } from './author.repository';
import { AuthorsService } from './authors.service';
import { Author } from './interfaces/authors.interface';
import { CreateAuthorDto } from './dto/create-author.dto';

describe('Authors Controller', () => {
  let authorController: AuthorsController;
  let authorsService: AuthorsService;
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthorsController],
      providers: [AuthorsService],
      imports: [
        TypeOrmModule.forRootAsync({
          imports: [DataBaseConfigModule],
          inject: [DataBaseConfigService],
          useFactory: (configService: DataBaseConfigService) => ({
            type: configService.type,
            host: configService.host,
            port: configService.port,
            username: configService.username,
            password: configService.password,
            database: configService.name,
            entities: [configService.entities],
            synchronize: configService.synchronize,
            useNewUrlParser: configService.useNewUrlParser,
            logging: configService.logging,
            useUnifiedTopology: configService.useUnifiedTopology,
          }),
        }),
        TypeOrmModule.forFeature([AuthorRepository]),
      ],
    }).compile();

    authorController = module.get<AuthorsController>(AuthorsController);
    authorsService = module.get<AuthorsService>(AuthorsService);
  });

  it('should be defined', () => {
    expect(authorController).toBeDefined();
  });

  describe('findAll', () => {
    it('should return  an array of author', async () => {
      const result = Promise.resolve<Author[]>([]);
      jest.spyOn(authorsService, 'findAll').mockImplementation(() => result);
      await expect(result).resolves.toBe(await authorController.findAll());
    });
  });

  describe('findOne', () => {
    it('should return an object of author', async () => {
      const author = await authorsService.create({
        firstName: 'User_TVR',
        lastName: 'User_TVR',
        birthday: new Date('1850-02-15T21:11:16.000Z'),
      });
      const result = await authorController.findOne(author.id);
      expect(result).toEqual(author);
    });
  });

  describe('create', () => {
    it('should return an object of author', async () => {
      const author = await authorsService.create({
        firstName: 'User',
        lastName: 'One',
        birthday: new Date('1850-02-15T21:11:16.000Z'),
      });
      expect(author.firstName).toEqual('User');
    });
  });

  describe('update', () => {
    it('should return an object of author', async () => {
      const author = await authorsService.create({
        firstName: 'User',
        lastName: 'Two',
        birthday: new Date('1850-02-15T21:11:16.000Z'),
      });
      const result = await authorController.update(author.id, {
        firstName: 'User_Two',
        lastName: 'Two',
        birthday: new Date('1850-02-15T21:11:16.000Z'),
      });
      expect(result).toEqual({
        ...result,
        firstName: 'User_Two',
        lastName: 'Two',
      });
    });
  });

  describe('delete', () => {
    it('should return void', async () => {
      const author = await authorsService.create({
        firstName: 'User',
        lastName: 'Two',
        birthday: new Date('1850-02-15T21:11:16.000Z'),
      });
      const result = await authorController.delete(author.id);
      expect(result).toBeUndefined();
    });
  });
});
