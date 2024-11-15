import {Module} from '@nestjs/common';
import {ConfigurationModule} from '@shareable/configuration/configuration.module';
import {Logger} from '@shareable/logger';
import {DatabaseModule} from '@shareable/database/database.module';

@Module({
    imports: [ConfigurationModule, DatabaseModule],
    controllers: [],
    providers: [Logger],
})
export class AppModule {
}
