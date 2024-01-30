import * as process from 'process';
import {EnvironmentEnum} from '@core/enum/environment.enum';

interface SwaggerServer {
    url: string,
    description: string,
}

interface Swagger {
    username?: string,
    password?: string,
    servers?: {
        [EnvironmentEnum.development]?: SwaggerServer,
        [EnvironmentEnum.staging]?: SwaggerServer,
        [EnvironmentEnum.producation]?: SwaggerServer,
    }
}


export interface configurationInterface {
    name: string,
    mode?: EnvironmentEnum | undefined,
    apps: {
        userApi: {
            port: string,
            swagger: Swagger,
        },
        admin: {
            port: string;
            swagger: Swagger,
        },
    };
    database: {
        type: string;
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
        synchronize: boolean;
        logging: boolean;
    };
    tokens: {
        jwt: {
            secret: string,
            tokenTll: string,
        },
    }
}

export const configuration = (): configurationInterface => ({
    name: process.env.APP_NAME,
    mode: process.env.APP_MODE as EnvironmentEnum,
    apps: {
        userApi: {
            port: process.env.APP_USER_API_PORT,
            swagger: {
                username: process.env.APP_USER_SWAGGER_USERNAME,
                password: process.env.APP_USER_SWAGGER_PASSWORD,
                servers: {
                    [EnvironmentEnum.development]: {
                        url: process.env.APP_USER_SWAGGER_DEVELOPMENT_URL,
                        description: EnvironmentEnum.development,
                    },
                },
            },
        },
        admin: {
            port: process.env.APP_ADMIN_API_PORT,
            swagger: {
                username: process.env.APP_ADMIN_SWAGGER_USERNAME,
                password: process.env.APP_ADMIN_SWAGGER_PASSWORD,
                servers: {
                    [EnvironmentEnum.development]: {
                        url: process.env.APP_ADMIN_SWAGGER_DEVELOPMENT_URL,
                        description: EnvironmentEnum.development,
                    },
                },
            },
        },
    },
    tokens: {
        jwt: {
            secret: "something",
            tokenTll: "4d",
        },
    },
    database: {
        type: process.env.DATABASE_TYPE || 'postgres',
        host: process.env.DATABASE_HOST || '127.0.0.1',
        port: parseInt(process.env.DATABASE_PORT || '5433'),
        username: process.env.DATABASE_USERNAME || 'docker',
        password: process.env.DATABASE_PASSWORD || 'docker',
        database: process.env.DATABASE_NAME || 'name',
        synchronize: process.env.DATABASE_SYNCHRONIZE == 'true',
        logging: process.env.DATABASE_LOGGING == 'true',
    },
});
