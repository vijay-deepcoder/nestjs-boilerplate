import 'reflect-metadata';
import {DataSource, DataSourceOptions} from 'typeorm';
import * as process from 'process';

export const AppDataSource = new DataSource({
    type: process.env.DATABASE_TYPE,
    // url: process.env.DATABASE_URL,
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT ? parseInt(process.env.DATABASE_PORT, 10) : 5432,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    synchronize: process.env.DATABASE_SYNCHRONIZE === 'true',
    dropSchema: false,
    keepConnectionAlive: true,
    logging: process.env.NODE_ENV !== 'production',
    entities: [__dirname + '/entities/*.entity{.ts,.js}'],
    migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
    cli: {
        entitiesDir: 'libs',
        migrationsDir: 'libs/core/src/database/migrations',
    },

} as DataSourceOptions);
