import {NestFactory} from '@nestjs/core';
import {NestExpressApplication} from '@nestjs/platform-express';
import {ConfigService} from '@nestjs/config';
import {Logger} from '@core/logger';
import {AppModule} from './modules/app.module';
import {cors, exceptionFilterPipe, helmet, swagger, validationPipe} from '@core/utility';


async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);
    const config: ConfigService = app.get(ConfigService);
    const appName = config.get('name');
    cors(app);
    helmet(app);
    validationPipe(app);
    exceptionFilterPipe(app);
    swagger({
        app,
        title: `${appName} User Apis`,
        description: `this swagger will contain all the ${config.get('name')} apis`,
        version: "0.1",
        path: "docs",
        mode: config.getOrThrow('mode'),
        servers: Object.values(config.getOrThrow('apps.admin.swagger.servers')),
        credentials: {
            [config.get('apps.admin.swagger.username')]: config.get('apps.admin.swagger.password'),
        },
    })
    return app.listen(config.getOrThrow('apps.admin.port')).then(() => app);
}

bootstrap().then(async (app: NestExpressApplication) => {
    const logger: Logger = app.get(Logger);
    const config: ConfigService = app.get(ConfigService);
    logger.log(`${config.get('name')} Apis running on ` + await app.getUrl(), 'Main.ts');
});
