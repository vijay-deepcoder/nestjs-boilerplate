import {Module} from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';
import {configuration} from '@core/configuration/configuration';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            load: [configuration],
        }),
    ],
    // providers: [ConfigService],
    // exports: [ConfigService],
})
export class ConfigurationModule {
}
