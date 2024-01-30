import {Module} from '@nestjs/common';
import {ConfigurationModule} from '@core/configuration/configuration.module';
import {Logger} from '@core/logger';
import {DatabaseModule} from '@core/database/database.module';

@Module({
    imports: [ConfigurationModule, DatabaseModule],
    controllers: [],
    providers: [Logger],
})
export class AppModule {
}
