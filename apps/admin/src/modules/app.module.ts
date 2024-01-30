import {Module} from '@nestjs/common';
import {ConfigurationModule} from '@core/configuration/configuration.module';
import {Logger} from '@core/logger';
import {DatabaseModule} from '@core/database/database.module';
import {JwtModule} from '@core/jwt/jwt.module';
import {AuthModule} from './auth/auth.module';
import {GeneralModule} from './general/general.module';
import {RepositoryModule} from '@shareable/database/repository/repository.module';
import {ModeratorModule} from './moderator/moderator.module';
import {UserModule} from "./user/user.module";


@Module({
    imports: [
        ConfigurationModule,
        JwtModule,
        DatabaseModule,
        RepositoryModule,
        AuthModule,
        GeneralModule,
        ModeratorModule,
        UserModule,

    ],
    providers: [
        Logger,
    ],
})
export class AppModule {
}
