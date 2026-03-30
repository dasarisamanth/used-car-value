import { DataSource, DataSourceOptions } from 'typeorm';

const nodeEnv = process.env.NODE_ENV;

const database = nodeEnv === 'test' ? 'test.sqlite' : 'db.sqlite';

export const nestDataSourceOptions: DataSourceOptions = {
  type: 'sqlite',
  database,
  synchronize: false,
};

export const dataSourceOptions: DataSourceOptions = {
  ...nestDataSourceOptions,
  entities: ['**/*.entity.{ts,js}'],
};

export const AppDataSource = new DataSource(dataSourceOptions);
