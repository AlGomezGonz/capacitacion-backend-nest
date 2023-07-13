import { DataSource, DataSourceOptions } from 'typeorm';
import dbConfig from './src/database/config';

export default new DataSource({
  ...(dbConfig as DataSourceOptions),
  migrations: ['./src/database/migrations/**/*{.js,.ts}'],
  migrationsTableName: 'migration',
});
