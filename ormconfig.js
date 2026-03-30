const { DataSource } = require('typeorm');

const nodeEnv = process.env.NODE_ENV;
const database = nodeEnv === 'test' ? 'test.sqlite' : 'db.sqlite';

const dataSourceOptions = {
    type: 'sqlite',
    database,
    synchronize: false,
    entities: ['**/*.entity.{ts,js}'],
};

const AppDataSource = new DataSource(dataSourceOptions);

module.exports = AppDataSource;
module.exports.AppDataSource = AppDataSource;
module.exports.dataSourceOptions = dataSourceOptions;