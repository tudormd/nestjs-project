import { Test, TestingModule } from '@nestjs/testing';
import { AuthorsService } from './authors.service';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DataBaseConfigService } from '../config/database/configuration.service';
import { DataBaseConfigModule } from '../config/database/configuration.module';
import { AuthorRepository } from './author.repository';
import { Author } from './interfaces/authors.interface';

describe('AuthorsService', () => {
  let authorsService: AuthorsService;
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
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
      providers: [AuthorsService],
    }).compile();

    authorsService = module.get<AuthorsService>(AuthorsService);
  });

  it('should be defined', () => {
    expect(authorsService).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of author', async () => {
      const result = Promise.resolve<Author[]>([]);
      jest.spyOn(authorsService, 'findAll').mockImplementation(() => result);
      await expect(result).resolves.toBe(await authorsService.findAll());
    });
  });

  describe('findOne', () => {
    it('should return an object of author', async () => {
      const author = await authorsService.create({
        firstName: 'User_Third',
        lastName: 'User_Third',
        birthday: new Date('1850-02-15T21:11:16.000Z'),
      });
      const result = await authorsService.findOne(author.id);
      expect(result).toEqual(author);
    });
  });

  describe('create', () => {
    it('should return an object of author', async () => {
      const result = await authorsService.create({
        firstName: 'User_T',
        lastName: 'User_T',
        birthday: new Date('1850-02-15T21:11:16.000Z'),
      });
      expect(result.firstName).toBe('User_T');
    });
  });

  describe('update', () => {
    it('should return an object of author', async () => {
      const author = await authorsService.create({
        firstName: 'User_TR',
        lastName: 'User_TR',
        birthday: new Date('1850-02-15T21:11:16.000Z'),
      });
      const result = await authorsService.update(author.id, {
        firstName: 'User_T',
        lastName: 'User_T',
        birthday: new Date('1850-02-15T21:11:16.000Z'),
      });
      expect(result.firstName).toBe('User_T');
    });
  });

  describe('delete', () => {
    it('should return void', async () => {
      const author = await authorsService.create({
        firstName: 'User_TR',
        lastName: 'User_TR',
        birthday: new Date('1850-02-15T21:11:16.000Z'),
      });
      const result = await authorsService.delete(author.id);
      expect(result).toBeUndefined();
    });
  });

});
