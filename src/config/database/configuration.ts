import { registerAs } from '@nestjs/config';

export default registerAs('db', () => ({
  env: process.env.APP_ENV,
  name: process.env.DATABASE_NAME,
  type: process.env.DATABASE_TYPE,
  host: process.env.DATABASE_HOST,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  port: parseInt(process.env.DATABASE_PORT),
  entities: process.env.DATABASE_ENTITIES,
  synchronize: process.env.TYPEORM_SYNCHRONIZE === 'true',
  migrationsRun: process.env.TYPEORM_MIGRATIONS_RUN === 'true',
  useNewUrlParser: process.env.USENEWURLPARSER === 'true',
  logging: process.env.LOGGING === 'true',
  useUnifiedTopology: process.env.USEUNIFIEDTOPOLOGY === 'true',
}));
